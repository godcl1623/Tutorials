interface ComponentBuilder {
  render(): HTMLElement;
}

export default class ComponentTemplate implements ComponentBuilder {
  protected container: HTMLDivElement;

  constructor(htmlStructureString: string) {
    this.container = document.createElement('div');
    this.container.innerHTML = htmlStructureString;
  }

  render(): HTMLElement {
    return this.container;
  }
}
