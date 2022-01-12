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

abstract class ProtoPostCreator<B, M, T> implements IPostCreator {
  protected abstract baseModule(ipt: B): HTMLElement;

  protected abstract mediaPostCreator(ipt: M): HTMLElement;

  protected abstract textPostCreator(ipt: T): HTMLElement;

  abstract ctnCreator(): HTMLElement;
}

class PostCreator extends ProtoPostCreator<BasePayload, MediaPayload, TxtPayload> {
  constructor(protected menuType: string | null) {
    super();
  }

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
        labelTxt: 'URL',
      };
      const mediaPayload: MediaPayload = {
        nameVal: 'URL',
        classVal: 'url need_ext',
      };
      const baseCnt = this.baseModule(basePayload);
      const mediaPost = this.mediaPostCreator(mediaPayload);
      baseCnt?.appendChild(mediaPost);
      result = baseCnt;
    } else {
      const basePayload: BasePayload = {
        forVal: 'Body',
        labelTxt: 'Body',
      };
      const txtPayload: TxtPayload = {
        nameVal: 'Body',
        classVal: 'body need_ext',
      };
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
const modalForm = modalBg?.querySelector('form#form_post');
const modalCloseBtn = modalBg?.querySelector('#btn_close');
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
      if (eTargetToHTML.id === 'modal_bg' || eTargetToHTML.id === 'btn_close') {
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

/* 3. 포스트 추가 메커니즘 */
type SectionBase = {
  sectionClass: string;
};

type SectionMedia = {
  imgWrapperClass: string;
  titleWrapperClass: string;
}

type SectionTxt = {
  postsCntClass: string;
}

const addBtn = modalBg?.querySelector('button#btn_add');
addBtn?.addEventListener('click', (): void => {
  const inputCtns = modalForm?.querySelectorAll('.input_container');
  const inputsArr: HTMLElement[] = [];
  /* ########## input vs textarea 구분 메커니즘 필요 ########## */
  inputCtns?.forEach(inputCtn => {
    Array.from(inputCtn.childNodes)
      .filter(childNode => {
        const cnToHTML = childNode as HTMLElement;
        if (cnToHTML.classList) {
          return cnToHTML.classList.contains('need_ext')
        }
      })
      .forEach(inptWithVal => inputsArr.push(inptWithVal as HTMLElement));
  });
  inputsArr.forEach(inpt => console.log(inpt.value));
});

// 임시 작성
class SectionCreator extends ProtoPostCreator<SectionBase, SectionMedia, SectionTxt> {
  constructor(protected menuType: string | null) {
    super();
  }
}