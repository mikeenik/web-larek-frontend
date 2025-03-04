export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
export type PaymentMethod = 'card' | 'cash';
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number;
}

export interface IProductsList {
    productsList: IProductItem[];
}

export interface IShoppingCart {
    items: IProductItem[];
    total: number;
}

export interface IOrder {
    items: IProductItem[];
    payment: PaymentMethod;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderSuccess {
    id: string;
    total: number;
}

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
