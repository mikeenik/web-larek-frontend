import { View } from "../components/base/view";

export class SuccessResult extends View {
    private totalElement: HTMLElement;
    private closeButton: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.totalElement = container.querySelector(".order-success__description") as HTMLElement;
        this.closeButton = container.querySelector(".order-success__close") as HTMLElement;

        this.initEventListeners();
    }

    private initEventListeners(): void {
        this.closeButton.addEventListener("click", () => this.hide());
    }

    public set total(total: number) {
        this.totalElement.textContent = `Списано ${total.toLocaleString()} синапсов`;
    }

    public open(): void {
        this.show();
    }

    public close(): void {
        this.hide();
    }

    public render(total: number): void {
        this.total = total;
        this.open();
    }
}
