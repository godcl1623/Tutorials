import App from './components/App.js';
import Modal from './components/Modal/Modal.js';
import PostCreateDialog from './components/Dialog/Dialog.js';
// import { SectionCreator } from './components/page.js';
import SectionCreator from './components/Page/Section.js';
import ImagePost from './components/Page/Items/Image.js';
import VideoPost from './components/Page/Items/Video.js';
import NotePost from './components/Page/Items/Note.js';
import TaskPost from './components/Page/Items/Task.js';
const root = document.querySelector('div#root');
const modal = document.querySelector('div#modal');
class TempDOM {
    constructor() {
        TempDOM.selectedMenu = '';
    }
    render(appContents, appRoot) {
        TempDOM.appRoot = appRoot;
        TempDOM.appRoot.innerHTML = appContents;
        const btns = TempDOM.appRoot.querySelectorAll('button.menu_btn');
        btns.forEach(btn => {
            this.registerModalOpen(btn);
        });
    }
    createPortal(htmlContents, modalRoot) {
        TempDOM.modalRoot = modalRoot;
        TempDOM.modalRoot.className = 'disabled';
        TempDOM.modalRoot.innerHTML = htmlContents;
        const modalForm = TempDOM.modalRoot.querySelector('form#form_post');
        this.registerModalClose(TempDOM.modalRoot);
        this.registerSubmit(modalForm);
    }
    registerModalOpen(tgt) {
        tgt.addEventListener('click', (e) => {
            const eTargetToHTML = e.target;
            // const modalBg = document.querySelector('#modal');
            const modalBg = TempDOM.modalRoot;
            const modalForm = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('form#form_post');
            TempDOM.selectedMenu = eTargetToHTML.textContent;
            const _payloadCondition = TempDOM.selectedMenu === 'IMAGE' || TempDOM.selectedMenu === 'VIDEO';
            const _payloadTest = {
                forVal: _payloadCondition ? 'URL' : 'Body',
                labelTxt: _payloadCondition ? 'URL' : 'Body',
                nameVal: _payloadCondition ? 'URL' : 'Body',
                classVal: _payloadCondition ? 'url need_ext' : 'body need_ext'
            };
            const postCreator = new PostCreateDialog(TempDOM.selectedMenu, _payloadTest);
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
            const motionPosts = TempDOM.appRoot.querySelector('article#motion_posts');
            const $section = new SectionCreator(TempDOM.selectedMenu).render();
            Object.keys(eTargetToHTML)
                .slice(0, 2)
                .forEach(key => formVals.push(eTargetToHTML[key].value));
            $section.innerHTML += this.generatePosts(formVals[0], formVals[1]).render().innerHTML;
            motionPosts === null || motionPosts === void 0 ? void 0 : motionPosts.appendChild($section);
            TempDOM.selectedMenu = '';
        });
    }
    generatePosts(title, content) {
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
    delPost(e) {
        const eTargetToHTML = e.target;
        const delTarget = eTargetToHTML.parentNode.parentNode;
        const delCnt = TempDOM.appRoot.querySelector('article#motion_posts');
        delCnt === null || delCnt === void 0 ? void 0 : delCnt.removeChild(delTarget);
    }
}
const tempDOM = new TempDOM();
tempDOM.render(App, root);
tempDOM.createPortal(Modal, modal);
// TotalComponent();
//# sourceMappingURL=index.js.map