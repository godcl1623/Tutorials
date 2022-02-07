import App from './components/Core/App.js';
import Modal from './components/Modal/Modal.js';
import PostCreateDialog, { DialogPayload } from './components/Dialog/Dialog.js';
import SectionCreator from './components/Page/Section.js';
import ImagePost from './components/Page/Items/Image.js';
import VideoPost from './components/Page/Items/Video.js';
import NotePost from './components/Page/Items/Note.js';
import TaskPost from './components/Page/Items/Task.js';

type DOMRectTemp<T> = {
  [P in keyof T]?: T[P];
}

type DOMRectEdited = DOMRectTemp<DOMRect>;

const root = document.querySelector('div#root');
const modal = document.querySelector('div#modal');

class TempDOM {
  private static selectedMenu: string;

  private static appRoot: null | HTMLDivElement;

  private static modalRoot: null | HTMLDivElement;

  private static clientCoords: DOMRectEdited;

  private static lastElDir: string = '';

  static lastElIdx: number = 0;

  static dragged: HTMLElement | null = null;

  constructor() {
    TempDOM.selectedMenu = '';
  }

  render(appContents: string, appRoot: HTMLDivElement) {
    TempDOM.appRoot = appRoot;
    TempDOM.appRoot.innerHTML = appContents;
    const btns = TempDOM.appRoot.querySelectorAll('button.menu_btn');
    btns.forEach(btn => {
      this.registerModalOpen(btn! as HTMLButtonElement);
    })
    this.delPost(TempDOM.appRoot);
    this.dragEventsController(TempDOM.appRoot);
    TempDOM.dropEventsController();
  }
  
  createPortal(htmlContents: string, modalRoot: HTMLDivElement) {
    TempDOM.modalRoot = modalRoot;
    TempDOM.modalRoot.className = 'disabled';
    TempDOM.modalRoot.innerHTML = htmlContents;
    const modalForm = TempDOM.modalRoot.querySelector('form#form_post');
    this.registerModalClose(TempDOM.modalRoot);
    this.registerSubmit(modalForm! as HTMLFormElement);
  }

  private registerModalOpen(tgt: HTMLButtonElement) {
    tgt.addEventListener('click', (e): void => {
      const eTargetToHTML = e.target as HTMLElement;
      // const modalBg = document.querySelector('#modal');
      const modalBg = TempDOM.modalRoot;
      const modalForm = modalBg?.querySelector('form#form_post');
      TempDOM.selectedMenu = eTargetToHTML.textContent! as string;
      const _payloadCondition = TempDOM.selectedMenu === 'IMAGE' || TempDOM.selectedMenu === 'VIDEO';
      const _payloadTest: DialogPayload = {
        forVal: _payloadCondition ? 'URL' : 'Body',
        labelTxt: _payloadCondition ? 'URL' : 'Body',
        nameVal: _payloadCondition ? 'URL' : 'Body',
        classVal: _payloadCondition ? 'url need_ext' : 'body need_ext'
      };
      const postCreator = new PostCreateDialog(TempDOM.selectedMenu! as string, _payloadTest);
      const $inputCnt = postCreator.render();
      const targetCtn = modalForm?.querySelector('.ap_target');
      modalBg?.classList.remove('disabled');
      const titleVal = (modalForm?.childNodes[1].childNodes[3] as HTMLInputElement);
      if (titleVal.value !== '') titleVal.value = '';
      if (targetCtn?.childNodes.length === 0) {
        targetCtn.appendChild($inputCnt);
      } else {
        targetCtn?.replaceChild($inputCnt, targetCtn.querySelector('div')! as HTMLDivElement);
      }
    })
  }

  private registerModalClose(tgt: HTMLDivElement) {
    tgt.addEventListener('click', (e): void => {
      const eTargetToHTML = e.target as HTMLElement;
      if (eTargetToHTML.id === 'modal' || eTargetToHTML.id === 'btn_close' || eTargetToHTML.id === 'btn_add') {
        tgt?.classList.add('disabled');
      }
    })
  }

  private registerSubmit(tgt: HTMLFormElement) {
    tgt.addEventListener('submit', (e): void => {
      e.preventDefault();
      type SubmitVals = HTMLInputElement | HTMLTextAreaElement;
      const eTargetToHTML = e.target as HTMLFormElement;
      const formVals: string[] = [];
      const motionPosts = (TempDOM.appRoot! as HTMLElement).querySelector('article#motion_posts') as HTMLElement;
      const $section = new SectionCreator(TempDOM.selectedMenu).render();
      Object.keys(eTargetToHTML)
        .slice(0, 2)
        .forEach(key => formVals.push((eTargetToHTML[key] as SubmitVals).value));
      $section.innerHTML += this.generatePosts(formVals[0], formVals[1]).render().innerHTML;
      motionPosts?.appendChild($section);
      TempDOM.selectedMenu = '';
    });
  }

  private generatePosts(title: string, content: string) {
    switch (TempDOM.selectedMenu) {
      case 'IMAGE':
        return new ImagePost(title, content);
      case 'VIDEO':
        return new VideoPost(title, content);
      case 'NOTE':
        return new NotePost(title, content);
      case 'TASK':
        return new TaskPost(title, content);
      default:
        throw new Error('Invalid menuType input error !');
    }
  }

  private delPost(tgt: HTMLElement): void {
    tgt.addEventListener('click', (e: Event) => {
      const eTargetToHTML = e.target as HTMLElement;
      if (eTargetToHTML.className === 'btn_del') {
        const delTarget = (eTargetToHTML.parentNode!.parentNode! as HTMLElement);
        const delCnt = (TempDOM.appRoot! as HTMLElement).querySelector('article#motion_posts');
        delCnt?.removeChild(delTarget);
      }
    });
  }

  private chkLastIdx = (event: Event): void => {
    const eTargetToHTML = event.target as HTMLElement;
    const parentOne = eTargetToHTML.parentElement;
    const parentsTwo = parentOne?.parentElement;
    const motionPosts = (TempDOM.appRoot! as HTMLElement).querySelector('article#motion_posts')! as HTMLElement;
    const sectionLists = Array.from(motionPosts.childNodes).filter(item => (item as HTMLElement).className);
    if (eTargetToHTML instanceof HTMLDivElement && eTargetToHTML.className) {
      TempDOM.lastElIdx = sectionLists.indexOf(parentOne as HTMLElement);
    } else if (!eTargetToHTML.className) {
      TempDOM.lastElIdx = sectionLists.indexOf(parentsTwo as HTMLElement);
    }
  }

  private itemTopOrBot = (event: MouseEvent): void => {
    const eTargetToHTML = event.target as HTMLElement;
    const parentOne = eTargetToHTML.parentElement;
    const parentsTwo = parentOne?.parentElement;
    if (eTargetToHTML instanceof HTMLDivElement) {
      TempDOM.clientCoords = parentOne?.getBoundingClientRect() as DOMRect;
    } else if (!eTargetToHTML.className) {
      TempDOM.clientCoords = parentsTwo?.getBoundingClientRect() as DOMRect;
    }
    const itemMid: number = (TempDOM.clientCoords.top as number) + ((TempDOM.clientCoords.height as number) / 2);
    if (event.clientY > itemMid) {
      TempDOM.lastElDir = 'bot';
    } else if (event.clientY < itemMid) {
      TempDOM.lastElDir = 'top';
    } else {
      throw new Error('Section direction declaration error !');
    }
  }

  private dragEventsController = (tgt: HTMLElement): void => {
    tgt.addEventListener('dragstart', (e: DragEvent): void => {
      TempDOM.dragged = e.target as HTMLElement;
    });
    tgt.addEventListener('dragover', (e: DragEvent): void => {
      e.preventDefault();
      if (!(e.target as HTMLElement).id) {
        this.chkLastIdx(e);
        this.itemTopOrBot(e)
      }
    });
  }

  static dropEventsController = (): void => {
    const motionPosts = (TempDOM.appRoot! as HTMLElement).querySelector('article#motion_posts')! as HTMLElement;
    motionPosts.addEventListener('dragover', (e: DragEvent): void => {
      e.preventDefault();
    });
    motionPosts.addEventListener('drop', (e: DragEvent): void => {
      e.preventDefault();
      // motionPosts nodeList
      // eslint-disable-next-line no-undef
      const sectionLists: ChildNode[] = Array.from(motionPosts.childNodes)
        .filter(item => (item as HTMLElement).className);
      const currIdx: number = sectionLists.indexOf(this.dragged as HTMLElement);
      // eslint-disable-next-line no-undef
      let frontList: ChildNode[] = [];
      // eslint-disable-next-line no-undef
      let rearList: ChildNode[] = [];
      // eslint-disable-next-line no-undef
      let dragFilteredList: ChildNode[] = [];
      // eslint-disable-next-line no-undef
      let newList: ChildNode[] = [];
      // 1. 현재 motionPosts nodeList 내 아이템 전체 삭제
      sectionLists.forEach(section => motionPosts.removeChild(section));
      // 2. nodeList 분리
      if (this.lastElDir === 'top') {
        frontList = sectionLists.slice(0, this.lastElIdx);
        rearList = sectionLists.slice(this.lastElIdx, sectionLists.length);
      } else {
        frontList = sectionLists.slice(0, this.lastElIdx + 1);
        rearList = sectionLists.slice(this.lastElIdx + 1, sectionLists.length);
      }
      // 3. 드래그 아이템 추가 & 5. 리스트 합치기
      if (currIdx < this.lastElIdx) {
        dragFilteredList = frontList.filter(section => section !== this.dragged);
        dragFilteredList.push(this.dragged as HTMLElement);
        newList = dragFilteredList.concat(rearList);
      } else if (currIdx > this.lastElIdx) {
        dragFilteredList = rearList.filter(section => section !== this.dragged);
        frontList.push(this.dragged as HTMLElement);
        newList = frontList.concat(dragFilteredList);
      } else {
        newList = sectionLists;
      }
      // 4. 새 리스트 node에 추가
      newList.forEach(section => motionPosts.appendChild(section));
    });
  }
}

const tempDOM = new TempDOM();

tempDOM.render(App, root! as HTMLDivElement);
tempDOM.createPortal(Modal, modal! as HTMLDivElement);
