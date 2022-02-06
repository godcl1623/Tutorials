import App from './components/App.js';
import Modal from './components/Modal/Modal.js';
import PostCreateDialog from './components/Dialog/Dialog.js';
import { SectionCreator } from './components/page.js';
const root = document.querySelector('div#root');
const modal = document.querySelector('div#modal');
class TempDOM {
    constructor() {
        this.selectedMenu = '';
    }
    render(appContents, appRoot) {
        appRoot.innerHTML = appContents;
        const btns = appRoot.querySelectorAll('button.menu_btn');
        btns.forEach(btn => {
            this.registerModalOpen(btn);
        });
    }
    createPortal(htmlContents, modalRoot) {
        modalRoot.className = 'disabled';
        modalRoot.innerHTML = htmlContents;
        const modalForm = modalRoot.querySelector('form#form_post');
        this.registerModalClose(modalRoot);
        this.registerSubmit(modalForm);
    }
    registerModalOpen(tgt) {
        tgt.addEventListener('click', (e) => {
            const eTargetToHTML = e.target;
            const modalBg = document.querySelector('#modal');
            const modalForm = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('form#form_post');
            this.selectedMenu = eTargetToHTML.textContent;
            const _payloadCondition = this.selectedMenu === 'IMAGE' || this.selectedMenu === 'VIDEO';
            const _payloadTest = {
                forVal: _payloadCondition ? 'URL' : 'Body',
                labelTxt: _payloadCondition ? 'URL' : 'Body',
                nameVal: _payloadCondition ? 'URL' : 'Body',
                classVal: _payloadCondition ? 'url need_ext' : 'body need_ext'
            };
            const postCreator = new PostCreateDialog(this.selectedMenu, _payloadTest);
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
        tgt.addEventListener('click', (e) => {
            const eTargetToHTML = e.target;
            if (eTargetToHTML.id === 'modal' || eTargetToHTML.id === 'btn_close' || eTargetToHTML.id === 'btn_add') {
                tgt === null || tgt === void 0 ? void 0 : tgt.classList.add('disabled');
            }
        });
    }
    registerSubmit(tgt) {
        tgt.addEventListener('submit', (e) => {
            e.preventDefault();
            const eTargetToHTML = e.target;
            const formVals = [];
            const motionPosts = document.querySelector('article#motion_posts');
            let $section;
            let sectionCreator;
            Object.keys(eTargetToHTML)
                .slice(0, 2)
                .forEach(key => formVals.push(eTargetToHTML[key].value));
            if (this.selectedMenu === 'IMAGE' || this.selectedMenu === 'VIDEO') {
                sectionCreator = new SectionCreator(this.selectedMenu, formVals[0], formVals[1]);
                $section = sectionCreator.ctnCreator();
            }
            else {
                sectionCreator = new SectionCreator(this.selectedMenu, formVals[0], '', formVals[1]);
                $section = sectionCreator.ctnCreator();
            }
            motionPosts === null || motionPosts === void 0 ? void 0 : motionPosts.appendChild($section);
            this.selectedMenu = '';
            sectionCreator.itemId++;
        });
    }
}
const tempDOM = new TempDOM();
tempDOM.render(App, root);
tempDOM.createPortal(Modal, modal);
// TotalComponent();
//# sourceMappingURL=index.js.map