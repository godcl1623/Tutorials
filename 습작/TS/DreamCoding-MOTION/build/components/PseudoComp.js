export default class ComponentTemplate {
    constructor(htmlStructureString) {
        this.container = document.createElement('div');
        this.container.innerHTML = htmlStructureString;
    }
    render() {
        return this.container;
    }
}
//# sourceMappingURL=PseudoComp.js.map