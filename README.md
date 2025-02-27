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

## Архитектура приложения MVP (Model-View-Presenter)
### Класс Api предназначен для взаимодействия с сервером
#### Методы:
- protected handleResponse(response: Response): Promise<object> - Обработка данных с back-end
- get(uri: string) - Получение части url
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - Отправка данных на back-end

### Класс EventEmitter предназначен для обработки событий *наследуется от IEvents*
#### Методы:
- on<T extends object>(eventName: EventName, callback: (event: T) => void) - Установка обработчика на событие
- off(eventName: EventName, callback: Subscriber) - Сброс обработчика с события
- emit<T extends object>(eventName: string, data?: T) - Инициализация события с данными
- onAll(callback: (event: EmitterEvent) => void) - Слушать все события
- offAll()- Сбросить все обработчики
- trigger<T extends object>(eventName: string, context?: Partial<T>) - Сделать коллбек триггер, генерирующий событие при вызове 

### Класс ModelApi предназначен для отправки/получения данных с сервера *наследуется от Api*
#### Методы:
- getProductList - Получение каталога продуктов с back-end

### Класс ModelShoppingCart предназначен для хранения данных полученных от пользователя
#### Методы:
- getAllProducts - Получение всех товаров в корзине
- getProductPrice - Получение стоимости товара
- getTotalAmount - Суммирование стоимости всех товара в корзине
- addProductToShoppingCart - Добавление товара в корзину
- deleteProductToShoppingCart - Удаление товара из корзины
- clearShoppingCart - Очистка данных корзины

### Класс ModelProductItem предназначен для хранения данных товара полученных с сервера
#### Методы:
- getProductDetails - Получение данных товара

### Класс ModelCustomer предназначен для хранения данных пользователя
#### Методы:
- setCustomerData - Установка данных пользователяЁ
- validateCustomerData - Проверка данных пользователя
- getOrder - Получение данных заказа

### Класс ShoppingCart корзина
#### Методы:
- renderCountAllProductInShoppingCart - Отображение всего кол-ва товаров в корзине на главной странице

### Класс ProductItem карточка товара
#### Методы:
- renderProductItem - Отображение подробную информацию о товаре
- disableShoppingCartButton - Дизейбл кнопки, когда товар добавили в корзину
- enableShoppingCartButton - Возвращение активности кнопки

### Класс Payment способ оплаты
#### Методы:
- renderPaymentMethod - Отображение способа оплаты

### Класс Success успешный заказ
#### Методы:
- renderOrderSuccessMessage - Отображение сообщение о успешном заказе


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
