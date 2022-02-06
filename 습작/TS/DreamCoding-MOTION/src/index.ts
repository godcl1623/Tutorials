import App from './components/App.js';
// import TotalComponent from './components/page.js';
import TempComponent from './components/temp.js';
import Modal from './components/Modal/Modal.js';
import PostCreateDialog, { Payload } from './components/Dialog/Dialog.js';
import { SectionCreator } from './components/page.js';

const root = document.querySelector('div#root');
const modal = document.querySelector('div#modal');

class TempDOM {
  private selectedMenu: string;

  constructor() {
    this.selectedMenu = '';
  }

  render(appContents: string, appRoot: HTMLDivElement) {
    appRoot.innerHTML = appContents;
    const btns = appRoot.querySelectorAll('button.menu_btn');
    btns.forEach(btn => {
      this.registerModalOpen(btn! as HTMLButtonElement);
    })
  }
  
  createPortal(htmlContents: string, modalRoot: HTMLDivElement) {
    modalRoot.className = 'disabled';
    modalRoot.innerHTML = htmlContents;
    const modalForm = modalRoot.querySelector('form#form_post');
    this.registerModalClose(modalRoot);
    this.registerSubmit(modalForm! as HTMLFormElement);
  }

  private registerModalOpen(tgt: HTMLButtonElement) {
    tgt.addEventListener('click', (e): void => {
      const eTargetToHTML = e.target as HTMLElement;
      const modalBg = document.querySelector('#modal');
      const modalForm = modalBg?.querySelector('form#form_post');
      this.selectedMenu = eTargetToHTML.textContent! as string;
      const _payloadCondition = this.selectedMenu === 'IMAGE' || this.selectedMenu === 'VIDEO';
      const _payloadTest: Payload = {
        forVal: _payloadCondition ? 'URL' : 'Body',
        labelTxt: _payloadCondition ? 'URL' : 'Body',
        nameVal: _payloadCondition ? 'URL' : 'Body',
        classVal: _payloadCondition ? 'url need_ext' : 'body need_ext'
      };
      const postCreator = new PostCreateDialog(this.selectedMenu! as string, _payloadTest);
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
      const motionPosts = document.querySelector('article#motion_posts') as HTMLElement;
      let $section: HTMLElement;
      let sectionCreator: SectionCreator;
      Object.keys(eTargetToHTML)
      .slice(0, 2)
      .forEach(key => formVals.push((eTargetToHTML[key] as SubmitVals).value));
      if (this.selectedMenu === 'IMAGE' || this.selectedMenu === 'VIDEO') {
        sectionCreator = new SectionCreator(this.selectedMenu, formVals[0], formVals[1])
        $section = sectionCreator.ctnCreator();
      } else {
        sectionCreator = new SectionCreator(this.selectedMenu, formVals[0], '', formVals[1]);
        $section = sectionCreator.ctnCreator();
      }
      motionPosts?.appendChild($section);
      this.selectedMenu = '';
      sectionCreator.itemId++;
    });
  }
}

const tempDOM = new TempDOM();

tempDOM.render(App, root! as HTMLDivElement);
tempDOM.createPortal(Modal, modal! as HTMLDivElement);
// TotalComponent();