interface ComponentBuilder {
  render(): HTMLDivElement;
}

export class ComponentTemplate implements ComponentBuilder {
  protected container: HTMLDivElement;

  constructor(htmlStructureString: string) {
    this.container = document.createElement('div');
    this.container.innerHTML = htmlStructureString;
  }

  render() {
    return this.container;
  }
}

class TempDOM {
  render(appContents: string, appRoot: HTMLDivElement) {
    appRoot.innerHTML = appContents;
  }

  createPortal(htmlContents: string, modalRoot: HTMLDivElement) {
    modalRoot.className = 'disabled';
    modalRoot.innerHTML = htmlContents;
  }
}


export default new TempDOM();