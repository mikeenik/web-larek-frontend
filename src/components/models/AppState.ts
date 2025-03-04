import { IProductItem, IOrder } from '../../types';
import { EventEmitter } from '../../components/base/events';

export class AppState {
    private _products: IProductItem[] = [];
    private _preview: string | null = null;
    private _order: IOrder | null = null;
    private _basket: IProductItem[] = [];
    private events: EventEmitter = new EventEmitter();

    clearCart(): void {
        this._basket = [];
        this.events.emit('cartUpdated', this._basket);
    }

    addToCart(item: IProductItem): void {
        if (!this.isItemInCart(item)) {
            this._basket.push(item);
            this.events.emit('cartUpdated', this._basket);
        }
    }

    deleteFromCart(itemId: string): void {
        this._basket = this._basket.filter(item => item.id !== itemId);
        this.events.emit('cartUpdated', this._basket);
    }

    isItemInCart(item: IProductItem): boolean {
        return this._basket.some(cartItem => cartItem.id === item.id);
    }

    getTotalPrice(): number {
        return this._basket.reduce((sum, item) => sum + item.price, 0);
    }

    getCartLength(): number {
        return this._basket.length;
    }

    clearOrder(): void {
        this._order = null;
        this.events.emit('orderCleared');
    }

    checkValidation(data: Partial<IOrder>): boolean {
        return Object.values(data).every(value => value?.trim() !== '');
    }
}
