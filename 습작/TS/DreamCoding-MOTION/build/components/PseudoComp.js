export class ComponentTemplate {
    constructor(htmlStructureString) {
        this.container = document.createElement('div');
        this.container.innerHTML = htmlStructureString;
    }
    render() {
        return this.container;
    }
}
class TempDOM {
    render(appContents, appRoot) {
        appRoot.innerHTML = appContents;
    }
    createPortal(htmlContents, modalRoot) {
        modalRoot.className = 'disabled';
        modalRoot.innerHTML = htmlContents;
    }
}
export default new TempDOM();
//# sourceMappingURL=PseudoComp.js.map