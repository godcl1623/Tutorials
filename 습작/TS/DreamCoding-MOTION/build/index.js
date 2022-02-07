var _a;
import App from './components/Core/App.js';
import Modal from './components/Modal/Modal.js';
import PostCreateDialog from './components/Dialog/Dialog.js';
import SectionCreator from './components/Page/Section.js';
import ImagePost from './components/Page/Items/Image.js';
import VideoPost from './components/Page/Items/Video.js';
import NotePost from './components/Page/Items/Note.js';
import TaskPost from './components/Page/Items/Task.js';
const root = document.querySelector('div#root');
const modal = document.querySelector('div#modal');
class TempDOM {
    constructor() {
        this.chkLastIdx = (event) => {
            const eTargetToHTML = event.target;
            const parentOne = eTargetToHTML.parentElement;
            const parentsTwo = parentOne === null || parentOne === void 0 ? void 0 : parentOne.parentElement;
            const motionPosts = TempDOM.appRoot.querySelector('article#motion_posts');
            const sectionLists = Array.from(motionPosts.childNodes).filter(item => item.className);
            if (eTargetToHTML instanceof HTMLDivElement && eTargetToHTML.className) {
                TempDOM.lastElIdx = sectionLists.indexOf(parentOne);
            }
            else if (!eTargetToHTML.className) {
                TempDOM.lastElIdx = sectionLists.indexOf(parentsTwo);
            }
        };
        this.itemTopOrBot = (event) => {
            const eTargetToHTML = event.target;
            const parentOne = eTargetToHTML.parentElement;
            const parentsTwo = parentOne === null || parentOne === void 0 ? void 0 : parentOne.parentElement;
            if (eTargetToHTML instanceof HTMLDivElement) {
                TempDOM.clientCoords = parentOne === null || parentOne === void 0 ? void 0 : parentOne.getBoundingClientRect();
            }
            else if (!eTargetToHTML.className) {
                TempDOM.clientCoords = parentsTwo === null || parentsTwo === void 0 ? void 0 : parentsTwo.getBoundingClientRect();
            }
            const itemMid = TempDOM.clientCoords.top + (TempDOM.clientCoords.height / 2);
            if (event.clientY > itemMid) {
                TempDOM.lastElDir = 'bot';
            }
            else if (event.clientY < itemMid) {
                TempDOM.lastElDir = 'top';
            }
            else {
                throw new Error('Section direction declaration error !');
            }
        };
        this.dragEventsController = (tgt) => {
            tgt.addEventListener('dragstart', (e) => {
                TempDOM.dragged = e.target;
            });
            tgt.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!e.target.id) {
                    this.chkLastIdx(e);
                    this.itemTopOrBot(e);
                }
            });
        };
        TempDOM.selectedMenu = '';
    }
    render(appContents, appRoot) {
        TempDOM.appRoot = appRoot;
        TempDOM.appRoot.innerHTML = appContents;
        const btns = TempDOM.appRoot.querySelectorAll('button.menu_btn');
        btns.forEach(btn => {
            this.registerModalOpen(btn);
        });
        this.delPost(TempDOM.appRoot);
        this.dragEventsController(TempDOM.appRoot);
        TempDOM.dropEventsController();
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
    delPost(tgt) {
        tgt.addEventListener('click', (e) => {
            const eTargetToHTML = e.target;
            if (eTargetToHTML.className === 'btn_del') {
                const delTarget = eTargetToHTML.parentNode.parentNode;
                const delCnt = TempDOM.appRoot.querySelector('article#motion_posts');
                delCnt === null || delCnt === void 0 ? void 0 : delCnt.removeChild(delTarget);
            }
        });
    }
}
_a = TempDOM;
TempDOM.lastElDir = '';
TempDOM.lastElIdx = 0;
TempDOM.dragged = null;
TempDOM.dropEventsController = () => {
    const motionPosts = TempDOM.appRoot.querySelector('article#motion_posts');
    motionPosts.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    motionPosts.addEventListener('drop', (e) => {
        e.preventDefault();
        // motionPosts nodeList
        // eslint-disable-next-line no-undef
        const sectionLists = Array.from(motionPosts.childNodes)
            .filter(item => item.className);
        const currIdx = sectionLists.indexOf(_a.dragged);
        // eslint-disable-next-line no-undef
        let frontList = [];
        // eslint-disable-next-line no-undef
        let rearList = [];
        // eslint-disable-next-line no-undef
        let dragFilteredList = [];
        // eslint-disable-next-line no-undef
        let newList = [];
        // 1. 현재 motionPosts nodeList 내 아이템 전체 삭제
        sectionLists.forEach(section => motionPosts.removeChild(section));
        // 2. nodeList 분리
        if (_a.lastElDir === 'top') {
            frontList = sectionLists.slice(0, _a.lastElIdx);
            rearList = sectionLists.slice(_a.lastElIdx, sectionLists.length);
        }
        else {
            frontList = sectionLists.slice(0, _a.lastElIdx + 1);
            rearList = sectionLists.slice(_a.lastElIdx + 1, sectionLists.length);
        }
        // 3. 드래그 아이템 추가 & 5. 리스트 합치기
        if (currIdx < _a.lastElIdx) {
            dragFilteredList = frontList.filter(section => section !== _a.dragged);
            dragFilteredList.push(_a.dragged);
            newList = dragFilteredList.concat(rearList);
        }
        else if (currIdx > _a.lastElIdx) {
            dragFilteredList = rearList.filter(section => section !== _a.dragged);
            frontList.push(_a.dragged);
            newList = frontList.concat(dragFilteredList);
        }
        else {
            newList = sectionLists;
        }
        // 4. 새 리스트 node에 추가
        newList.forEach(section => motionPosts.appendChild(section));
    });
};
const tempDOM = new TempDOM();
tempDOM.render(App, root);
tempDOM.createPortal(Modal, modal);
//# sourceMappingURL=index.js.map