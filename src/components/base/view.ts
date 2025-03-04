export abstract class View {
    protected container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public show(): void {
        this.container.classList.remove("hidden");
    }

    public hide(): void {
        this.container.classList.add("hidden");
    }

    protected setText(element: HTMLElement, text: string): void {
        element.textContent = text;
    }

    protected setImage(element: HTMLImageElement, src: string, alt: string = ""): void {
        element.src = src;
        element.alt = alt;
    }

    protected setDisabled(element: HTMLButtonElement, disabled: boolean): void {
        element.disabled = disabled;
    }

    protected toggleClass(element: HTMLElement, className: string, add: boolean): void {
        element.classList.toggle(className, add);
    }

    public abstract render(...args: any[]): void;
}
