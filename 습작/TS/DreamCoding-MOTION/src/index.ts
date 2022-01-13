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

  protected abstract mediaPostCreator(ipt: M, url?: string, title?: string): HTMLElement | HTMLElement[];

  protected abstract textPostCreator(ipt: T, body?: string, title?: string): HTMLElement;

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
let selectedMenu: string | null = '';
function modalOpener(btns: NodeListOf<Element> | undefined, target: Element | null): void {
  btns?.forEach(btn =>
    btn.addEventListener('click', (e): void => {
      // null인 경우가 있을 수 있으므로 주의
      const eTargetToHTML = e.target as HTMLElement;
      selectedMenu = eTargetToHTML.textContent;
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
      if (eTargetToHTML.id === 'modal_bg' || eTargetToHTML.id === 'btn_close' || eTargetToHTML.id === 'btn_add') {
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

// 임시 작성
class SectionCreator extends ProtoPostCreator<SectionBase, SectionMedia, SectionTxt> {
  constructor(
    protected menuType: string | null,
    protected title?: string,
    protected url?: string,
    protected body?: string
  ) {
    super();
  }

  protected baseModule(ipt: SectionBase): HTMLElement {
    const $section = document.createElement('section');
    $section.className = ipt.sectionClass;
    const $div = document.createElement('div');
    $div.className = 'close_container';
    const $btn = document.createElement('button');
    $btn.className = 'btn_close';
    $div.appendChild($btn);
    $section.appendChild($div);
    return $section;
  };

  protected mediaPostCreator(ipt: SectionMedia, url: string, title: string): HTMLElement[] {
    const mediaCnt = document.createElement('div');
    mediaCnt.className = ipt.imgWrapperClass;
    if (this.menuType === 'IMAGE') {
      const $img = document.createElement('img');
      $img.src = url;
      $img.alt = 'img';
      mediaCnt.appendChild($img);
    } else {
      const $iframe = document.createElement('iframe');
      const rawUrl: string[] = url.includes('=') ? url.split('=') : url.split('/');
      $iframe.width = '560';
      $iframe.height = '315';
      $iframe.src = `https://www.youtube.com/embed/${rawUrl[rawUrl.length - 1]}`;
      $iframe.title = 'YouTube video player';
      $iframe.frameBorder = '0';
      $iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      $iframe.allowFullscreen = true;
      mediaCnt.appendChild($iframe);
    }
    const titleCnt = document.createElement('div');
    titleCnt.className = ipt.titleWrapperClass;
    const $h2 = document.createElement('h2');
    $h2.textContent = title;
    titleCnt.appendChild($h2);
    return [titleCnt, mediaCnt];
  };

  protected textPostCreator(ipt: SectionTxt, body: string, title: string): HTMLElement {
    const postCnt = document.createElement('div');
    postCnt.className = ipt.postsCntClass;
    if (this.menuType === 'NOTE') {
      const $h2 = document.createElement('h2');
      $h2.textContent = title;
      const $p = document.createElement('p');
      $p.textContent = body;
      postCnt.appendChild($h2);
      postCnt.appendChild($p);
    } else {
      const $h2 = document.createElement('h2');
      $h2.textContent = title;
      const bodyCnt = document.createElement('div');
      const $input = document.createElement('input');
      $input.type = 'checkbox';
      $input.name = 'checkbox'
      const $label = document.createElement('label');
      $label.htmlFor = 'checkbox';
      $label.textContent = body;
      bodyCnt.appendChild($input);
      bodyCnt.appendChild($label);
      postCnt.appendChild($h2);
      postCnt.appendChild(bodyCnt);
    }
    return postCnt;
  };

  ctnCreator(): HTMLElement {
    let result: HTMLElement;
    if (this.menuType === 'IMAGE') {
      const sectionBase: SectionBase = {
        sectionClass: 'media image'
      };
      const sectionMedia: SectionMedia = {
        imgWrapperClass: 'image_wrapper',
        titleWrapperClass: 'posts_title'
      };
      const baseCnt = this.baseModule(sectionBase);
      const mediaPost = this.mediaPostCreator(sectionMedia, this.url!, this.title!);
      mediaPost.forEach(media => baseCnt.appendChild(media));
      result = baseCnt;
    } else if (this.menuType === 'VIDEO') {
      const sectionBase: SectionBase = {
        sectionClass: 'media video'
      };
      const sectionMedia: SectionMedia = {
        imgWrapperClass: 'video_wrapper',
        titleWrapperClass: 'posts_title'
      };
      const baseCnt = this.baseModule(sectionBase);
      const mediaPost = this.mediaPostCreator(sectionMedia, this.url!, this.title!);
      mediaPost.forEach(media => baseCnt.appendChild(media));
      result = baseCnt;
    } else if (this.menuType === 'NOTE') {
      const sectionBase: SectionBase = {
        sectionClass: 'posts note'
      };
      const sectionTxt: SectionTxt = {
        postsCntClass: 'posts_container'
      };
      const baseCnt = this.baseModule(sectionBase);
      const txtPost = this.textPostCreator(sectionTxt, this.body!, this.title!);
      baseCnt.appendChild(txtPost);
      result = baseCnt;
    } else {
      const sectionBase: SectionBase = {
        sectionClass: 'posts task'
      };
      const sectionTxt: SectionTxt = {
        postsCntClass: 'posts_container'
      };
      const baseCnt = this.baseModule(sectionBase);
      const txtPost = this.textPostCreator(sectionTxt, this.body!, this.title!);
      baseCnt.appendChild(txtPost);
      result = baseCnt;
    }
    return result;
  };
}

const addBtn = modalBg?.querySelector('button#btn_add');
addBtn?.addEventListener('click', (e): void => {
  const inputCtns = modalForm?.querySelectorAll('.input_container');
  const inputsArr: HTMLElement[] = [];
  const motionPosts = document.querySelector('article#motion_posts');
  let $section: HTMLElement;
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
  if (selectedMenu === 'IMAGE' || selectedMenu === 'VIDEO') {
    const sectionCreator: SectionCreator = new SectionCreator(selectedMenu, inputsArr[0].value, inputsArr[1].value)
    $section = sectionCreator.ctnCreator();
  } else {
    const sectionCreator: SectionCreator = new SectionCreator(selectedMenu, inputsArr[0].value, '', inputsArr[1].value);
    $section = sectionCreator.ctnCreator();
  }
  motionPosts?.appendChild($section);
  selectedMenu = '';
  modalCloser(modalBg, modalCloseBtn);
});