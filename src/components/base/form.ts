import { View } from "./view";

export abstract class Form extends View {
    protected formElement: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected errorContainer: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.formElement = container.querySelector("form") as HTMLFormElement;
        this.submitButton = this.formElement.querySelector("button[type='submit']") as HTMLButtonElement;
        this.errorContainer = this.formElement.querySelector(".form__errors") as HTMLElement;

        this.initEventListeners();
    }

    private initEventListeners(): void {
        this.formElement.addEventListener("input", () => this.onInputChange());
    }

    protected onInputChange(): void {
        const isValid = this.formElement.checkValidity();
        this.submitButton.disabled = !isValid;
    }

    protected toggleButtonState(isValid: boolean): void {
        if (isValid) {
            this.submitButton.removeAttribute("disabled");
        } else {
            this.submitButton.setAttribute("disabled", "true");
        }
    }

    public setErrors(errors: string[]): void {
        this.errorContainer.innerHTML = "";
        errors.forEach(error => {
            const errorElement = document.createElement("p");
            errorElement.textContent = error;
            this.errorContainer.appendChild(errorElement);
        });
    }

    public changeButtonState(isEnabled: boolean): void {
        this.submitButton.disabled = !isEnabled;
    }

    render(): void {
        this.onInputChange();
    }
}
