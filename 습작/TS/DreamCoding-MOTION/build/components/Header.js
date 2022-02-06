import PostCreateDialog from './Dialog/Dialog.js';
import ComponentTemplate from './PseudoComp.js';
class MenuBtns extends ComponentTemplate {
    constructor(menuTxt) {
        super(`
      <li class="menu_items">
        <button class="menu_btn"></button>
      </li>
    `);
        this.menuTxt = menuTxt;
        this.menuBtn = this.container.querySelector('button.menu_btn');
        this.menuBtn.textContent = this.menuTxt;
    }
    attachTo(cntRoot) {
        cntRoot.appendChild(this.container.querySelector('li'));
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
            menu.attachTo(ul);
        });
    }
    registerModalOpen(tgt) {
        const btn = tgt.render().querySelector('button');
        btn.addEventListener('click', (e) => {
            const eTargetToHTML = e.target;
            const modalBg = document.querySelector('#modal');
            const modalForm = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('form#form_post');
            const selectedMenu = eTargetToHTML.textContent;
            const _payloadCondition = selectedMenu === 'IMAGE' || selectedMenu === 'VIDEO';
            const _payloadTest = {
                forVal: _payloadCondition ? 'URL' : 'Body',
                labelTxt: _payloadCondition ? 'URL' : 'Body',
                nameVal: _payloadCondition ? 'URL' : 'Body',
                classVal: _payloadCondition ? 'url need_ext' : 'body need_ext'
            };
            const postCreator = new PostCreateDialog(selectedMenu, _payloadTest);
            const $inputCnt = postCreator.render();
            const targetCtn = modalForm === null || modalForm === void 0 ? void 0 : modalForm.querySelector('.ap_target');
            modalBg === null || modalBg === void 0 ? void 0 : modalBg.classList.remove('disabled');
            const titleVal = modalForm === null || modalForm === void 0 ? void 0 : modalForm.childNodes[1].childNodes[3];
            if (titleVal.value !== '')
                titleVal.value = '';
            if ((targetCtn === null || targetCtn === void 0 ? void 0 : targetCtn.childNodes.length) === 0) {
                targetCtn.appendChild($inputCnt);
            }
            else {
                targetCtn === null || targetCtn === void 0 ? void 0 : targetCtn.replaceChild($inputCnt, targetCtn.querySelector('div'));
            }
        });
    }
    registerModalClose(tgt) {
        const btn = tgt.render().querySelector('button');
        btn.addEventListener('click', (e) => {
            const modalBg = document.querySelector('#modal');
            const eTargetToHTML = e.target;
            if (eTargetToHTML.id === 'modal' || eTargetToHTML.id === 'btn_close' || eTargetToHTML.id === 'btn_add') {
                modalBg === null || modalBg === void 0 ? void 0 : modalBg.classList.add('disabled');
            }
        });
    }
}
export default new Header().render().innerHTML;
//# sourceMappingURL=Header.js.map