import './scss/styles.scss';

import { ProductCard, ProductCardPreview, BasketCard } from './components/Card';
import { BasketView } from './components/base/Basket';
import { ProductApi } from './components/AppApi';
import { AppStore } from './components/AppState';
import { ensureElement, cloneTemplate, createProductCard } from './utils/utils';
import { IProduct, IOrderInfoForm, IContactForm, TFormErrors, IOrder } from './types';
import { OrderInfoForm } from './components/OrderInfoForm';
import { ContactsForm } from './components/ContactForm';
import { Success } from './components/Success';
import { EventEmitter } from './components/base/Events';
import { API_URL, CDN_URL } from './utils/constants';
import { Page } from './components/Page';
import { Modal } from './components/base/Modal';

const events = new EventEmitter();
const api = new ProductApi(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderInfoTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new Page(document.body, events);
const appData = new AppStore({}, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

events.on('products: changed', () => {
	page.gallery = appData.products.map((item) =>
		createProductCard(
			ProductCard,
			cardCatalogTemplate,
			{
				title: item.title,
				image: item.image,
				category: item.category,
				price: item.price,
				id: item.id,
			},
			{ onClick: () => events.emit('card:select', item) },
			'card'
		).element
	);
});

events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

events.on('preview:changed', (item: IProduct) => {
	const card = createProductCard(
		ProductCardPreview,
		cardPreviewTemplate,
		{
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
			id: item.id,
			description: item.description,
			inBasket: item.inBasket,
		},
		{
			onClick: () => {
				if (!item.inBasket) {
					events.emit('card:add', item);
				} else {
					events.emit('card:remove', item);
				}
			},
		}
	);

	events.on('card:add', () => {
		card.inBasket = true;
	});

	events.on('card:remove', () => {
		card.inBasket = false;
	});

	modal.render({
		content: card.element,
	});
});

const basket = new BasketView(cloneTemplate(basketTemplate), events);

events.on('card:add', (item: IProduct) => {
	appData.addProductInBasket(item);
});

events.on('card:remove', (item: IProduct) => {
	appData.removeProductFromBasket(item.id);
});

events.on('basket:changed', () => {
	page.counter = appData.basket.length;
	basket.items = appData.basket.map((item, index) =>
		createProductCard(
			BasketCard,
			cardBasketTemplate,
			{
				index: index + 1,
				title: item.title,
				price: item.price,
				id: item.id,
			},
			{
				onClick: () => {
					events.emit('card:remove', item);
				},
			}
		).element
	);

	basket.render({
		total: appData.basketTotal,
	});
});

events.on('basket:open', () => {
	basket.items = appData.basket.map((item, index) => {
		const card = new BasketCard(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('card:remove', item);
			},
		});
		return card.render({
			index: index + 1,
			title: item.title,
			price: item.price,
		});
	});

	modal.render({
		content: basket.render({
			total: appData.getTotal(),
		}),
	});
});

events.on('basket:submit', () => {
	appData.setOrderBasket();
	events.emit('orderInfo:open');
});

const orderInfo = new OrderInfoForm(cloneTemplate(orderInfoTemplate), events);
const contacts = new ContactsForm(cloneTemplate(contactsTemplate), events);

events.on('orderInfo:open', () => {
	const payment = appData.order.payment ? appData.order.payment : null;
	const address = appData.order.address ? appData.order.address : '';

	const valid = appData.formErrors
		? !appData.formErrors.payment && !appData.formErrors.address
		: false;

	modal.render({
		content: orderInfo.render({
			payment,
			address,
			valid,
			errors: [],
		}),
	});
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderInfoForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on(/^contacts\..*:change/,(data: { field: keyof IContactForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on('formErrors:change', (errors: Partial<TFormErrors>) => {
	const { payment, address, email, phone } = errors;
	orderInfo.valid = !payment && !address;
	contacts.valid = !email && !phone;
	orderInfo.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
	console.log(appData.formErrors);
});

events.on('order:submit', () => {
	const email = appData.order.email ? appData.order.email : '';
	const phone = appData.order.phone ? appData.order.phone : '';

	const valid = appData.formErrors
    ? !appData.formErrors.email && !appData.formErrors.phone 
    : false;

	modal.render({
		content: contacts.render({
			email,
			phone,
			valid,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	api
		.postOrder(appData.order as IOrder)
		.then((result) => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});

			events.emit('order:success');

			modal.render({
				content: success.render({
					total: result.total,
				}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('order:success', () => {
	appData.clearBasket();
	appData.clearOrder();
  appData.clearErrors();
	orderInfo.resetForm();
	contacts.resetForm();
});

api
	.getProductsList()
	.then((data) => {
		appData.setProducts(data);
	})
	.catch((err) => {
		console.error(err);
	});