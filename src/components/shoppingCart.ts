import { View } from "./base/view"; 

export class ShoppingCart extends View {
    private itemList: HTMLElement;
    private totalPriceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.itemList = this.container.querySelector(".basket__list") as HTMLElement;
        this.totalPriceElement = this.container.querySelector(".basket__price") as HTMLElement;
    }

    public set items(items: HTMLElement[]) {
        this.itemList.innerHTML = "";
        items.forEach(item => this.itemList.appendChild(item));
    }

    public set total(value: number) {
        this.totalPriceElement.textContent = `${value} синапсов`;
    }

    public clearCart(): void {
        this.itemList.innerHTML = "";
        this.totalPriceElement.textContent = "0 синапсов";
    }

    render(): void {}
}
