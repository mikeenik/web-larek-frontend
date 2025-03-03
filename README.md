# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения MVP (Model-View-Presenter)

MVP (Model-View-Presenter) — это архитектурный паттерн проектирования, который помогает разделить логику приложения, работу с данными и интерфейс, чтобы упростить поддержку и расширение кода.

- Model (Модель) — отвечает за данные и бизнес-логику. Здесь обрабатываются запросы к базе данных или API, вычисляются значения и выполняются все операции с данными.
- View (Представление) — отвечает за отображение данных на экране и обработку пользовательского ввода. Однако View не содержит логики, а только передаёт события презентеру.
- Presenter (Презентер) — связывает Model и View. Он получает данные от модели, подготавливает их в нужном формате и передаёт представлению. Также презентер обрабатывает действия пользователя и управляет логикой взаимодействия.


## Базовые классы и типы данных
### Класс Api предназначен для взаимодействия с сервером
Тип для методов Api
```
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```
Интерфейс Api
```
interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
  };
```

Методы:<br>
⚫ protected handleResponse(response: Response): Promise<object>  Обработка данных с back-end<br>
⚫ get(uri: string) - Получение части url<br>
⚫ post(uri: string, data: object, method: ApiPostMethods = 'POST') - Отправка данных на back-end.

### Интерфейс IProductItem товар
```
interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number;
}
```
Тип категории товара
```
type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
```

### Интерфейс IOrder заказ
```
interface IOrder {
    items: IProductItem[];
	payment: paymentMethod;
	address: string;
	email: string;
	phone: string;
}
```

Тип способа оплаты
```
type paymentMethod = 'card'| 'cash'
```

### Интерфейс IProductsList каталог
```
interface IProductsList {
    productsList: IProductItem[];
}
```

### Интерфейс IShoppingCart корзина
```
interface IShoppingCart {
    items: IProductItem[];
    total: number;
}
```

### Интерфейс IOrderSuccess успешный заказ
```
interface IOrderSuccess {
    id: string;
    total: number;
  };
```

### Класс AppState предназначен для хранения глобольного состояния приложения

Поля:<br>
⚫ _products: IProductItem[] - массив продуктов<br>
⚫ _preview: string | null - id продукта, выбранный для просмотра в модальном окне<br>
⚫ _order: IOrder - текущий заказ<br>
⚫ _basket: IProductItem[] - корзина товаров<br>
⚫ events: IEvents - экземпляр класса EventEmitter для инициации событий при изменении данных.<br>

Методы:<br>
⚫ clearCart(): void - очистка корзины<br>
⚫ addToCart(item: IProduct): void - метод для добавления товара в корзину<br>
⚫ deleteFromCart(itemId: number): void - метод для удаления товара из корзины<br>
⚫ isLotInCart(item: IProduct): boolean - проверка наличия товара в корзине<br>
⚫ getTotalPrice(): number - метод возвращает полную стоимость корзины<br>
⚫ getCartIds(): number[] - возвращает id товаров в корзине<br>
⚫ getCartLength(): number - количество товаров в корзине<br>
⚫ clearOrder(): void - удаляет текущий заказ<br>
⚫ checkValidation(data: Record<keyof IOrder, string>): boolean - проверяет объект с данными заказа на валидность<br>

## VIEW
### Класс View 
Абстракный класс определяющий базовую структуру для всех представлений в приложении. Он содержит конструктор, задающий основные параметры представления, и метод render, который отвечает за отображение связанного с представлением DOM-элемента с заданными параметрами.

Конструктор принимает элемент, в который будет встроен компонент
```
constructor(container: HTMLElement)
```

Методы:<br>
⚫ toggleClass — добавляет/удаляет указанный класс у переданного элемента<br>
⚫ setText — изменяет текстовое содержимое элемента<br>
⚫ setImage — устанавливает изображение для элемента типа HTMLImageElement<br>
⚫ setDisabled — управляет доступностью элемента, блокируя или разблокируя его<br>
⚫ setHidden, setVisible — видимость элемента<br>
⚫ render — базовый метод отрисовки компонента, который должен быть переопределён в дочерних классах.<br>

### Класс Form отвечает за работу с формами и наследуется от View
Методы:<br>
⚫ onInputChange — обработчик ввода, который отслеживает изменения в полях формы<br>
⚫ changeButtonState — контролирует активность кнопки отправки в зависимости от состояния валидации формы<br>
⚫ setErrors — применяет и отображает ошибки валидации<br>
⚫ render — обновляет состояние формы, устанавливая актуальные ошибки, валидность и введённые значения.<br>

### Класс Modal отвечает за работу модальных окон и наследуется от View
Методы:<br>
⚫ set content — обновляет содержимое модального окна<br>
⚫ open — открывает модальное окно<br>
⚫ close — закрывает модальное окно<br>
⚫ render — рендерит модальное окно с переданным содержимым и автоматически открывает его<br>

### Класс Page управляет главной страницей и наследуется от View
Методы:<br>
⚫  set counter — обновляет количество товаров в корзине<br>
⚫ set catalog — заменяет текущее содержимое каталога переданными данными<br>
⚫ set locked — включает или отключает блокировку прокрутки и взаимодействия с интерфейсом<br>

### Класс ShoppingCartModal отвечает за работу корзины и наследуется от View
Методы:<br>
⚫ toggleButton - переключает состояние кнопки<br>
⚫ set items - устанавливает товары в корзине<br>
⚫ set total - устанавливает общую стоимость товаров<br>

### Класс ShippingForm предназначен для отображения и управления формой доставки, и наследуется от Form
Методы:<br>
⚫ toggleButtons - переключает активность кнопок оплаты<br>
⚫ set address - устанавливает адрес доставки<br>

### Класс CustomerDataForm предназначен для отображения и управления формой контактной информации, и наследуется от Form
Методы:<br>
⚫ set phone — задаёт номер телефона<br>
⚫ set email — устанавливает адрес электронной почты<br>

### Класс SuccessResult предназначен для управления уведомлением об успешном заказе
Методы:<br>
⚫ set total — обновляет текстовое отображение суммы завершённой операции<br>

### Класс ProductItem предназначен для управления карточками товаров в каталоге, и наследуется от View
Методы:<br>
⚫ disablePriceButton — проверяет наличие цены и отключает кнопку покупки, если цена отсутствует<br>
⚫ set/get id — управляет уникальным идентификатором карточки<br>
⚫ set/get title — изменяет или получает название товара<br>
⚫ set/get price — устанавливает или возвращает цену товара<br>
⚫ set/get category — задаёт категорию товара и её визуальное отображение<br>
⚫ set image — загружает изображение товара<br>
⚫ set description — обновляет описание товара<br>
⚫ set buttonTitle — изменяет текст кнопки взаимодействия<br>

## PRESENTER
### Класс EventEmitter предназначен для обработки событий реализуется IEvents
Методы:<br>
⚫ on<T extends object>(eventName: EventName, callback: (event: T) => void) - Установка обработчика на событие<br>
⚫ off(eventName: EventName, callback: Subscriber) - Сброс обработчика с события<br>
⚫ emit<T extends object>(eventName: string, data?: T) - Инициализация события с данными<br>
⚫ onAll(callback: (event: EmitterEvent) => void) - Слушать все события<br>
⚫ offAll()- Сбросить все обработчики<br>
⚫ trigger<T extends object>(eventName: string, context?: Partial<T>) - Сделать коллбек триггер, генерирующий событие при вызове 
