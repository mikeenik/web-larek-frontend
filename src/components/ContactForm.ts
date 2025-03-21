import { IContactForm } from "../types";
import { Form } from "./base/BaseForm";
import { IEvents } from "./base/BaseEvents";

export class ContactsForm extends Form<IContactForm> {

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container, events);
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }

  set email(value: string) {
      (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }
}