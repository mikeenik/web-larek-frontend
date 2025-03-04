import { View } from '../components/base/view';

export class Page extends View {
    constructor(container: HTMLElement) {
        super(container);
    }

    render(): void {
        this.container.innerHTML = '';
    }
}
