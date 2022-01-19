/* eslint-disable class-methods-use-this */
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
  ctnCreator(): HTMLElement | HTMLElement[];
}

abstract class ProtoPostCreator<B, M, T> implements IPostCreator {
  // eslint-disable-next-line no-unused-vars
  protected abstract baseModule(ipt: B): HTMLElement;

  // eslint-disable-next-line no-unused-vars
  protected abstract mediaPostCreator(ipt: M, url?: string, title?: string): HTMLElement | HTMLElement[];

  // eslint-disable-next-line no-unused-vars
  protected abstract textPostCreator(ipt: T, body?: string, title?: string): HTMLElement;

  abstract ctnCreator(): HTMLElement | HTMLElement[];
}

class PostCreator extends ProtoPostCreator<BasePayload, MediaPayload, TxtPayload> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected menuType: string | null) {
    super();
  }

  protected baseModule(ipt: BasePayload): HTMLElement {
    const $label = document.createElement('label');
    $label.htmlFor = ipt.forVal;
    $label.textContent = ipt.labelTxt;
    return $label;
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

  ctnCreator(): HTMLElement[] {
    let result: HTMLElement[];
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
      result = [baseCnt, mediaPost];
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
      result = [baseCnt, txtPost];
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
function modalOpener(
  // eslint-disable-next-line no-undef
  btns: NodeListOf<Element> | undefined,
  modalBg: Element | null,
  modalForm: Element | null | undefined
): void {
  btns?.forEach(btn =>
    btn.addEventListener('click', (e): void => {
      // null인 경우가 있을 수 있으므로 주의
      const eTargetToHTML = e.target as HTMLElement;
      selectedMenu = eTargetToHTML.textContent;
      const postCreator: PostCreator = new PostCreator(eTargetToHTML.textContent);
      const $inputCnt = postCreator.ctnCreator();
      const targetCtn = modalForm?.querySelector('.ap_target');
      modalBg?.classList.remove('disabled');
      const titleVal = (modalForm?.childNodes[1].childNodes[3] as HTMLInputElement);
      if (titleVal.value !== '') titleVal.value = '';
      if (targetCtn?.childNodes.length === 0) {
        $inputCnt.forEach(item => targetCtn?.appendChild(item));
      } else {
        $inputCnt.forEach((item, idx) => targetCtn?.replaceChild(item, targetCtn.childNodes[idx]));
      }
    })
  );
}

function modalCloser(bg: Element | null, btn: Element | null | undefined): void {
  const targets = [bg, btn];
  targets.forEach(target =>
    target?.addEventListener('click', (e): void => {
      const eTargetToHTML = e.target as HTMLElement;
      if (eTargetToHTML.id === 'modal_bg' || eTargetToHTML.id === 'btn_close' || eTargetToHTML.id === 'btn_add') {
        bg?.classList.add('disabled');
      }
    })
  );
}
modalOpener(menuBtns, modalBg, modalForm);
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

class Dnd {
  clientCoords = {};

  lastElDir: string = '';

  initYCoord: number = 0;

  lastElIdx: number = 0;

  // isClicked: boolean = false;

  // isMoving: boolean = false;

  // isDragging: boolean = false;

  dragged: HTMLElement | null = null;

  motionPosts: HTMLElement = document.querySelector('article#motion_posts') as HTMLElement;

  chkLastIdx = (event: Event): void => {
    const eTargetToHTML = event.target as HTMLElement;
    const parentOne = eTargetToHTML.parentElement;
    const parentsTwo = parentOne?.parentElement;
    const sectionLists = Array.from(this.motionPosts.childNodes).filter(item => (item as HTMLElement).className);
    if (eTargetToHTML instanceof HTMLDivElement) {
      this.lastElIdx = sectionLists.indexOf(parentOne as HTMLElement);
    } else if (!eTargetToHTML.className) {
      this.lastElIdx = sectionLists.indexOf(parentsTwo as HTMLElement);
    }
  }

  itemTopOrBot = (event: MouseEvent): void => {
    const eTargetToHTML = event.target as HTMLElement;
    const parentOne = eTargetToHTML.parentElement;
    const parentsTwo = parentOne?.parentElement;
    if (eTargetToHTML instanceof HTMLDivElement) {
      this.clientCoords = parentOne?.getBoundingClientRect() as DOMRect;
    } else if (!eTargetToHTML.className) {
      this.clientCoords = parentsTwo?.getBoundingClientRect() as DOMRect;
    }
    const itemMid = this.clientCoords.top + (this.clientCoords.height / 2);
    if (event.clientY > itemMid) {
      console.log('bot', this.lastElIdx)
    } else if (event.clientY < itemMid) {
      console.log('top', this.lastElIdx)
    }
  }

  eventsController = (tgt: HTMLElement): void => {
    // this.motionPosts.addEventListener('dragstart', (e: DragEvent) => { this.initYCoord = e.pageY});
    // this.motionPosts.addEventListener('dragover', (e: DragEvent) => {
    //   e.preventDefault();
    //   this.chkLastIdx(e);
    //   // console.log(this.initYCoord, e.pageY)
    // });
    tgt.addEventListener('dragover', e => {
      e.preventDefault();
      this.chkLastIdx(e);
      this.itemTopOrBot(e)
    })
    // this.motionPosts.addEventListener('drop', e => {
    //   const currentYCoord = e.clientY;
    //   if (currentYCoord - this.initYCoord > 0) {
    //     this.lastElDir = 'down';
    //   } else if (currentYCoord - this.initYCoord < 0) {
    //     this.lastElDir = 'up';
    //   }
    //   console.log(this.lastElDir)
    // })
    this.motionPosts.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
    })
    this.motionPosts.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();
      console.log('foo')
    })
  }
}

// 임시 작성
class SectionCreator extends ProtoPostCreator<SectionBase, SectionMedia, SectionTxt> {
  protected static _itemId: number = 0;

  get itemId(): number {
    return SectionCreator._itemId;
  }

  set itemId(val: number) {
    SectionCreator._itemId = val
  }

  constructor(
    // eslint-disable-next-line no-unused-vars
    protected menuType: string | null,
    // eslint-disable-next-line no-unused-vars
    protected title?: string,
    // eslint-disable-next-line no-unused-vars
    protected url?: string,
    // eslint-disable-next-line no-unused-vars
    protected body?: string
  ) {
    super();
  }

  /* 4. 포스트 삭제 메커니즘 */
  protected delPost(e: Event): void {
    const eTargetToHTML = e.target as HTMLElement;
    const delTarget = (eTargetToHTML.parentNode!.parentNode! as HTMLElement);
    // const motionPosts = document.querySelector('article#motion_posts') as HTMLElement;
    // const delCnt = motionPosts.querySelector('div#drop_zone');
    const delCnt = document.querySelector('article#motion_posts') as HTMLElement;
    delCnt?.removeChild(delTarget);
  }

  protected baseModule(ipt: SectionBase): HTMLElement {
    const $section = document.createElement('section');
    $section.className = ipt.sectionClass;
    $section.draggable = true;
    $section.dataset.itemId = String(this.itemId);
    const $div = document.createElement('div');
    $div.className = 'close_container';
    const $btn = document.createElement('button');
    $btn.className = 'btn_del';
    $btn.innerText = '×';
    $btn.addEventListener('click', this.delPost);
    $div.appendChild($btn);
    $section.appendChild($div);
    const dnd = new Dnd();
    // $section.addEventListener('dragover', (e: Event) => dnd.itemTopOrBot(e));
    // $section.addEventListener('click', () => dnd.eventsController($section))
    dnd.eventsController($section);
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
      // $iframe.width = '560';
      // $iframe.height = '315';
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
      // $h2.draggable = true;
      const $p = document.createElement('p');
      $p.textContent = body;
      // $p.draggable = true;
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

modalForm?.addEventListener('submit', (e): void => {
  e.preventDefault();
  type SubmitVals = HTMLInputElement | HTMLTextAreaElement;
  const eTargetToHTML = e.target as HTMLFormElement;
  const formVals: string[] = [];
  const motionPosts = document.querySelector('article#motion_posts') as HTMLElement;
  const dropZone = motionPosts.querySelector('div#drop_zone');
  let $section: HTMLElement;
  let sectionCreator: SectionCreator;
  Object.keys(eTargetToHTML)
  .slice(0, 2)
  .forEach(key => formVals.push((eTargetToHTML[key] as SubmitVals).value));
  if (selectedMenu === 'IMAGE' || selectedMenu === 'VIDEO') {
    sectionCreator = new SectionCreator(selectedMenu, formVals[0], formVals[1])
    $section = sectionCreator.ctnCreator();
  } else {
    sectionCreator = new SectionCreator(selectedMenu, formVals[0], '', formVals[1]);
    $section = sectionCreator.ctnCreator();
  }
  // dropZone?.appendChild($section);
  motionPosts?.appendChild($section);
  selectedMenu = '';
  sectionCreator.itemId++;
});
