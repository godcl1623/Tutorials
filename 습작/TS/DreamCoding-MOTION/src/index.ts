/* 1. 추가 메뉴 모듈화 */
type BasePayload = {
  forVal: string;
  labelTxt: string;
};

type MediaPayload = {
  nameVal: BasePayload['forVal'];
  classVal: string;
};

type TxtPayload = MediaPayload;

interface IPostCreator {
  ctnCreator(): HTMLElement;
}

class PostCreator implements IPostCreator {
  constructor(protected menuType: string | null) {}
  
  protected baseModule(ipt: BasePayload): HTMLElement {
    const $div = document.createElement('div');
    $div.className = 'input_container del_target';
    const $label = document.createElement('label');
    $label.htmlFor = ipt.forVal;
    $label.textContent = ipt.labelTxt;
    $div.appendChild($label);
    return $div;
  }
  
  protected mediaPostCreator(ipt: MediaPayload): HTMLElement {
    const $input = document.createElement('input');
    $input.name = ipt.nameVal;
    $input.className = ipt.classVal;
    return $input;
  }
  
  protected textPostCreator(ipt: TxtPayload): HTMLElement {
    const $area = document.createElement('textarea');
    $area.name = ipt.nameVal;
    $area.className = ipt.classVal;
    return $area;
  }
  
  ctnCreator(): HTMLElement {
    let result: HTMLElement;
    if (this.menuType === 'IMAGE' || this.menuType === 'VIDEO') {
      const basePayload: BasePayload = {
        forVal: 'URL',
        labelTxt: 'URL'
      }
      const mediaPayload: MediaPayload = {
        nameVal: 'URL',
        classVal: 'url'
      }
      const baseCnt = this.baseModule(basePayload);
      const mediaPost = this.mediaPostCreator(mediaPayload);
      baseCnt?.appendChild(mediaPost);
      result = baseCnt;
    } else {
      const basePayload: BasePayload = {
        forVal: 'Body',
        labelTxt: 'Body'
      }
      const txtPayload: TxtPayload = {
        nameVal: 'Body',
        classVal: 'body'
      }
      const baseCnt = this.baseModule(basePayload);
      const txtPost = this.textPostCreator(txtPayload);
      baseCnt?.appendChild(txtPost);
      result = baseCnt;
    }
    return result;
  }
}

/* 2. 모달창 여닫기 */
const motionMenu = document.querySelector('#motion_menu');
const menuBtns = motionMenu?.querySelectorAll('.menu_items');
const modalBg = document.querySelector('#modal_bg');
const modalCloseBtn = modalBg?.querySelector('.btn_close');
function modalOpener(btns: NodeListOf<Element> | undefined, target: Element | null): void {
  btns?.forEach(btn =>
    btn.addEventListener('click', (e): void => {
      // null인 경우가 있을 수 있으므로 주의
      const eTargetToHTML = e.target as HTMLElement;
      const postCreator: PostCreator = new PostCreator(eTargetToHTML.textContent);
      const $inputCnt = postCreator.ctnCreator();
      const modalForm = target?.querySelector('form#form_post');
      target?.classList.remove('disabled');
      modalForm?.appendChild($inputCnt);
    })
  );
}
function modalCloser(bg: Element | null, btn: Element | null | undefined): void {
  const targets = [bg, btn];
  targets.forEach(target =>
    target?.addEventListener('click', (e): void => {
      const eTargetToHTML = e.target as HTMLElement;
      if (eTargetToHTML.id === 'modal_bg' || eTargetToHTML.className === 'btn_close') {
        const delTarget = bg?.querySelector('.del_target');
        const modalForm = bg?.querySelector('form#form_post');
        bg?.classList.add('disabled');
        if (delTarget) {
          modalForm?.removeChild(delTarget);
        }
      }
    })
  );
}
modalOpener(menuBtns, modalBg);
modalCloser(modalBg, modalCloseBtn);