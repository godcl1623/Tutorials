import ComponentTemplate from '../Util/PseudoComp.js';
export default class PostCreateDialog extends ComponentTemplate {
    constructor(menuType, payload) {
        super(`
      <label></label>
    `);
        this.payload = payload;
        this.menuType = menuType;
        const $label = this.container.querySelector('label');
        $label.htmlFor = this.payload.forVal;
        $label.textContent = this.payload.labelTxt;
        const valInput = this.generateDialog(this.menuType, this.payload);
        this.container.appendChild(valInput);
    }
    generateDialog(menuType, payload) {
        const element = menuType === 'IMAGE' || menuType === 'VIDEO' ? 'input' : 'textarea';
        const $value = document.createElement(element);
        $value.name = payload.nameVal;
        $value.className = payload.classVal;
        return $value;
    }
}
//# sourceMappingURL=Dialog.js.map