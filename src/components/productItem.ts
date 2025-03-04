import { View } from "./base/view";
import { IProductItem } from "../types";

export class ProductItem extends View {
    private id!: string;
    private titleElement: HTMLElement;
    private imageElement: HTMLImageElement;
    private categoryElement: HTMLElement;
    private descriptionElement: HTMLElement;
    private priceElement: HTMLElement;
    private buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleElement = this.getElement(".card__title");
        this.imageElement = this.getElement(".card__image") as HTMLImageElement;
        this.categoryElement = this.getElement(".card__category");
        this.descriptionElement = this.getElement(".card__text");
        this.priceElement = this.getElement(".card__price");
        this.buttonElement = this.getElement(".card__button") as HTMLButtonElement;

        this.initEvents();
    }

    private getElement(selector: string): HTMLElement {
        const element = this.container.querySelector(selector) as HTMLElement;
        if (!element) {
            throw new Error(`Элемент ${selector} не найден в ProductItem.`);
        }
        return element;
    }

    private initEvents(): void {
        this.buttonElement.addEventListener("click", () => this.onBuyClick());
    }

    private onBuyClick(): void {
        console.log(`Товар "${this.titleElement.textContent}" добавлен в корзину.`);
        this.disableBuyButton();
    }

    public set product(product: IProductItem) {
        this.id = product.id;
        this.titleElement.textContent = product.title;
        this.imageElement.src = product.image;
        this.imageElement.alt = product.title;
        this.categoryElement.textContent = product.category;
        this.descriptionElement.textContent = product.description;
        this.priceElement.textContent = `${product.price} синапсов`;
    }

    public get productId(): string {
        return this.id;
    }

    public disableBuyButton(): void {
        this.buttonElement.disabled = true;
        this.buttonElement.textContent = "В корзине";
    }

    public enableBuyButton(): void {
        this.buttonElement.disabled = false;
        this.buttonElement.textContent = "В корзину";
    }

    // ✅ Реализация абстрактного метода render()
    public render(): void {
        this.container.innerHTML = '';
    }
}
