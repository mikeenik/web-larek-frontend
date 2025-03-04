import { Form } from "./base/form";

export class CustomerDataForm extends Form {
    private phoneInput: HTMLInputElement;
    private emailInput: HTMLInputElement;

    constructor(container: HTMLFormElement) {
        super(container);

        this.phoneInput = this.getElement<HTMLInputElement>(".form__input[name='phone']");
        this.emailInput = this.getElement<HTMLInputElement>(".form__input[name='email']");

        this.initEvents();
    }

    private getElement<T extends HTMLElement>(selector: string): T {
        const element = this.container.querySelector(selector) as T;
        if (!element) {
            throw new Error(`Элемент ${selector} не найден в CustomerDataForm.`);
        }
        return element;
    }

    protected onInputChange(): void {
        const isValid = this.validateInputs();
        this.changeButtonState(isValid);
    }

    private validateInputs(): boolean {
        return this.phoneInput.value.trim() !== "" && this.emailInput.value.trim() !== "";
    }

    public set phone(phone: string): void {
        this.phoneInput.value = phone;
        this.onInputChange();
    }

    public set email(email: string): void {
        this.emailInput.value = email;
        this.onInputChange();
    }

    public render(): void {
        this.container.innerHTML = `
            <div class="order">
                <label class="order__field">
                    <span class="form__label modal__title">Email</span>
                    <input name="email" class="form__input" type="text" placeholder="Введите Email" value="${this.emailInput.value}" />
                </label>
                <label class="order__field">
                    <span class="form__label modal__title">Телефон</span>
                    <input name="phone" class="form__input" type="text" placeholder="+7 (" value="${this.phoneInput.value}" />
                </label>
            </div>
            <div class="modal__actions">
                <button type="submit" class="button" ${this.validateInputs() ? "" : "disabled"}>Оплатить</button>
            </div>
        `;
    }

    private initEvents(): void {
        this.phoneInput.addEventListener("input", () => this.onInputChange());
        this.emailInput.addEventListener("input", () => this.onInputChange());
    }
}
