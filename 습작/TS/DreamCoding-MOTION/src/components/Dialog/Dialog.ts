import { ComponentTemplate } from '../PseudoComp.js';

export type Payload = {
  forVal?: string;
  labelTxt?: string;
  nameVal?: string;
  classVal?: string;
}

export default class PostCreateDialog extends ComponentTemplate {
  private payload: Payload;

  private menuType: string;

  constructor(menuType: string, payload: Payload) {
    super(`
      <label></label>
    `);
    this.payload = payload;
    this.menuType = menuType;
    const $label = this.container.querySelector('label')! as HTMLLabelElement;
    $label.htmlFor = this.payload.forVal! as string;
    $label.textContent = this.payload.labelTxt! as string;
    const valInput = this.generateDialog(this.menuType, this.payload);
    this.container.appendChild(valInput);
  }

  private generateDialog(menuType: string, payload: Payload) {
    const element = menuType === 'IMAGE' || menuType === 'VIDEO' ? 'input' : 'textarea';
    const $value = document.createElement(element)! as HTMLInputElement | HTMLTextAreaElement;
    $value.name = payload.nameVal! as string;
    $value.className = payload.classVal! as string;
    return $value;
  }
}