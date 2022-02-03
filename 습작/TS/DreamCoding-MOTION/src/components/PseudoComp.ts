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