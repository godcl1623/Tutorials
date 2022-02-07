import App from './components/App.js';
// import TotalComponent from './components/page.js';
import TempComponent from './components/temp.js';
import Modal from './components/Modal/Modal.js';
import PostCreateDialog, { DialogPayload } from './components/Dialog/Dialog.js';
// import { SectionCreator } from './components/page.js';
import SectionCreator from './components/Page/Section.js';
import ImagePost from './components/Page/Items/Image.js';
import VideoPost from './components/Page/Items/Video.js';
import NotePost from './components/Page/Items/Note.js';
import TaskPost from './components/Page/Items/Task.js';
import Dnd from './components/page.js';

const root = document.querySelector('div#root');
const modal = document.querySelector('div#modal');

class TempDOM {
  private static selectedMenu: string;

  private static appRoot: null | HTMLDivElement;

  private static modalRoot: null | HTMLDivElement;

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

  private enableDrag(cnt: HTMLElement): void {

  }
}

const tempDOM = new TempDOM();

tempDOM.render(App, root! as HTMLDivElement);
tempDOM.createPortal(Modal, modal! as HTMLDivElement);
// TotalComponent();