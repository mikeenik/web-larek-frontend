import { Form } from "./base/form";

export class ShippingForm extends Form {
    private addressInput!: HTMLInputElement;
    private paymentButtons!: NodeListOf<HTMLButtonElement>;
    private selectedPayment: string | null = null;

    constructor(container: HTMLElement) {
        super(container);

        this.initializeElements();
        this.initEvents();
    }

    private initializeElements(): void {
        this.addressInput = this.container.querySelector(".form__input") as HTMLInputElement;
        this.paymentButtons = this.container.querySelectorAll(".order__buttons .button_alt");

        if (!this.addressInput) {
            throw new Error("Элемент addressInput не найден в ShippingForm.");
        }
        if (!this.paymentButtons.length) {
            throw new Error("Кнопки оплаты не найдены в ShippingForm.");
        }
    }

    private initEvents(): void {
        this.paymentButtons.forEach(button => {
            button.addEventListener("click", () => this.toggleButtons(button));
        });

        this.addressInput.addEventListener("input", () => this.validate());
    }

    private toggleButtons(selectedButton: HTMLButtonElement): void {
        this.paymentButtons.forEach(button => button.classList.remove("button_selected"));
        selectedButton.classList.add("button_selected");
        this.selectedPayment = selectedButton.textContent?.trim() || null;
        this.validate();
    }

    public set address(value: string) {
        this.addressInput.value = value;
        this.validate();
    }

    public get address(): string {
        return this.addressInput.value.trim();
    }

    public validate(): void {
        const isValid = this.addressInput.value.trim().length > 0 && this.selectedPayment !== null;
        this.toggleButtonState(isValid);
    }
}
