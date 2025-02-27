//тип категории товара
type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
//тип способа оплаты
type paymentMethod = 'card'| 'cash'
//тип для методо api
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

//Интерфей Api
interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
  };

//Интерфейс карточки товара
interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number;
}

//Интерфейс каталога товаров
interface IProductsList {
    productsList: IProductItem[];
}

//Интерфейс для корзины
interface IShoppingCart {
    items: IProductItem[];
    total: number;
}

//Интерфейс для заказа
interface IOrder {
    items: IProductItem[];
	payment: paymentMethod;
	address: string;
	email: string;
	phone: string;
}

//Интерфейс успешного заказа
interface IOrderSuccess {
    id: string;
    total: number;
  };
