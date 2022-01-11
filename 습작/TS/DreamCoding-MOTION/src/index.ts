/* 1. 모달창 여닫기 */
const motionMenu = document.querySelector('#motion_menu');
const menuBtns = motionMenu?.querySelectorAll('.menu_items');
const modalBg = document.querySelector('#modal_bg');
const modalCloseBtn = modalBg?.querySelector('.btn_close');
function modalOpener(btns: NodeListOf<Element> | undefined, target: Element | null): void {
  btns?.forEach(btn =>
    btn.addEventListener('click', (): void => {
      // null인 경우가 있을 수 있으므로 주의
      target?.classList.remove('disabled');
    })
  );
}
function modalCloser(bg: Element | null, btn: Element | null | undefined): void {
  const targets = [bg, btn];
  targets.forEach(target =>
    target?.addEventListener('click', (): void => {
      bg?.classList.add('disabled');
    })
  );
}
modalOpener(menuBtns, modalBg);
modalCloser(modalBg, modalCloseBtn);

/* 2. 추가 메뉴 모듈화 */
class PostCreator {
  protected modalBody = modalBg?.querySelector('#modal_body');

  protected ctnCreator(
    className: string,
    labelTxt?: string,
    forTxt?: string,
    nameTxt?: string,
    clsNameTxt?: string
  ): HTMLElement | undefined {
    let result: HTMLElement | undefined;
    const $div = document.createElement('div');
    $div.className = className;
    if (className === 'close_container') {
      const $btn = document.createElement('button');
      $btn.className = 'btn_close';
      $btn.textContent = '×';
      $div.appendChild($btn);
      result = $div;
    } else if (className === 'input_container') {
      if (labelTxt && forTxt && nameTxt && clsNameTxt) {
        const $label = document.createElement('label');
        $label.htmlFor = forTxt;
        $label.textContent = labelTxt;
        const $input = document.createElement('input');
        $input.name = nameTxt;
        $input.className = clsNameTxt;
        $div.appendChild($label);
        $div.appendChild($input);
        result = $div;
      } else {
        throw new Error('Unexpected error occured: Some of txt values are undefined');
      }
    } else if (className === 'btn_container') {
      const $btn = document.createElement('button');
      $btn.className = 'btn_add';
      $btn.textContent = 'ADD';
      $div.appendChild($btn);
      result = $div;
    }
    return result;
  }
}
// const $div = elmCreator('div');
// const $label = elmCreator('label');
// const $input = elmCreator('input');
// const $textarea = elmCreator('textarea');
