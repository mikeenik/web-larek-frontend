import { View } from "./view";

export class Modal extends View {
    private closeButton: HTMLButtonElement;
    private contentContainer: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.closeButton = this.container.querySelector(".modal__close") as HTMLButtonElement;
        this.contentContainer = this.container.querySelector(".modal__content") as HTMLElement;

        this.initEventListeners();
    }

    private initEventListeners(): void {
        this.closeButton.addEventListener("click", () => this.close());
        this.container.addEventListener("click", (event) => {
            if (event.target === this.container) this.close();
        });
    }

    public set content(content: HTMLElement) {
        this.contentContainer.innerHTML = "";
        this.contentContainer.appendChild(content);
    }

    public open(): void {
        this.container.classList.add("modal_active");
    }

    public close(): void {
        this.container.classList.remove("modal_active");
    }

    render(): void {}
}
