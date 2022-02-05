import PostCreateDialog, { Payload } from './Dialog/Dialog.js';
import { ComponentTemplate } from './PseudoComp.js';

type OpenListener = () => void;
type CloseListener = () => void;

class MenuBtns extends ComponentTemplate {
  private menuTxt: string;

  private menuBtn: HTMLButtonElement;

  constructor(menuTxt: string) {
    super(`
      <li class="menu_items">
        <button class="menu_btn"></button>
      </li>
    `);
    this.menuTxt = menuTxt;
    this.menuBtn = this.container.querySelector('button.menu_btn')! as HTMLButtonElement;
    this.menuBtn.textContent = this.menuTxt;
    this.menuBtn.className += ` ${menuTxt}`;
  }

  attachTo(cntRoot: HTMLElement): void {
    cntRoot.appendChild(this.container.querySelector('li')! as HTMLLIElement);
  }
}

class Header extends ComponentTemplate {
  constructor() {
    super(`
      <header>
        <nav id="motion_menu">
          <h1>MOTION</h1>
          <ul id="motion_menu_btns"></ul>
        </nav>
      </header>
    `);
    const ul = this.container.querySelector('ul#motion_menu_btns');
    const image = new MenuBtns('IMAGE');
    const video = new MenuBtns('VIDEO');
    const note = new MenuBtns('NOTE');
    const task = new MenuBtns('TASK');
    const menus = [image, video, note, task];
    menus.forEach(menu => {
      menu.attachTo(ul! as HTMLUListElement);
    });
  }

  private registerModalOpen(tgt: MenuBtns) {
    const btn = tgt.render().querySelector('button')! as HTMLButtonElement;
    btn.addEventListener('click', (e): void => {
      const eTargetToHTML = e.target as HTMLElement;
      const modalBg = document.querySelector('#modal');
      const modalForm = modalBg?.querySelector('form#form_post');
      const selectedMenu = eTargetToHTML.textContent! as string;
      const _payloadCondition = selectedMenu === 'IMAGE' || selectedMenu === 'VIDEO';
      const _payloadTest: Payload = {
        forVal: _payloadCondition ? 'URL' : 'Body',
        labelTxt: _payloadCondition ? 'URL' : 'Body',
        nameVal: _payloadCondition ? 'URL' : 'Body',
        classVal: _payloadCondition ? 'url need_ext' : 'body need_ext'
      };
      const postCreator = new PostCreateDialog(selectedMenu! as string, _payloadTest);
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

  private registerModalClose(tgt: MenuBtns) {
    const btn = tgt.render().querySelector('button')! as HTMLButtonElement;
    btn.addEventListener('click', (e): void => {
      const modalBg = document.querySelector('#modal');
      const eTargetToHTML = e.target as HTMLElement;
      if (eTargetToHTML.id === 'modal' || eTargetToHTML.id === 'btn_close' || eTargetToHTML.id === 'btn_add') {
        modalBg?.classList.add('disabled');
      }
    })
  }
}

export default new Header().render().innerHTML;
