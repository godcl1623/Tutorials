"use strict";
class ProtoPostCreator {
}
class PostCreator extends ProtoPostCreator {
    constructor(menuType) {
        super();
        this.menuType = menuType;
    }
    baseModule(ipt) {
        const $div = document.createElement('div');
        $div.className = 'input_container del_target';
        const $label = document.createElement('label');
        $label.htmlFor = ipt.forVal;
        $label.textContent = ipt.labelTxt;
        $div.appendChild($label);
        return $div;
    }
    mediaPostCreator(ipt) {
        const $input = document.createElement('input');
        $input.name = ipt.nameVal;
        $input.className = ipt.classVal;
        return $input;
    }
    textPostCreator(ipt) {
        const $area = document.createElement('textarea');
        $area.name = ipt.nameVal;
        $area.className = ipt.classVal;
        return $area;
    }
    ctnCreator() {
        let result;
        if (this.menuType === 'IMAGE' || this.menuType === 'VIDEO') {
            const basePayload = {
                forVal: 'URL',
                labelTxt: 'URL',
            };
            const mediaPayload = {
                nameVal: 'URL',
                classVal: 'url need_ext',
            };
            const baseCnt = this.baseModule(basePayload);
            const mediaPost = this.mediaPostCreator(mediaPayload);
            baseCnt === null || baseCnt === void 0 ? void 0 : baseCnt.appendChild(mediaPost);
            result = baseCnt;
        }
        else {
            const basePayload = {
                forVal: 'Body',
                labelTxt: 'Body',
            };
            const txtPayload = {
                nameVal: 'Body',
                classVal: 'body need_ext',
            };
            const baseCnt = this.baseModule(basePayload);
            const txtPost = this.textPostCreator(txtPayload);
            baseCnt === null || baseCnt === void 0 ? void 0 : baseCnt.appendChild(txtPost);
            result = baseCnt;
        }
        return result;
    }
}
/* 2. 모달창 여닫기 */
const motionMenu = document.querySelector('#motion_menu');
const menuBtns = motionMenu === null || motionMenu === void 0 ? void 0 : motionMenu.querySelectorAll('.menu_items');
const modalBg = document.querySelector('#modal_bg');
const modalForm = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('form#form_post');
const modalCloseBtn = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('#btn_close');
function modalOpener(btns, target) {
    btns === null || btns === void 0 ? void 0 : btns.forEach(btn => btn.addEventListener('click', (e) => {
        // null인 경우가 있을 수 있으므로 주의
        const eTargetToHTML = e.target;
        const postCreator = new PostCreator(eTargetToHTML.textContent);
        const $inputCnt = postCreator.ctnCreator();
        const modalForm = target === null || target === void 0 ? void 0 : target.querySelector('form#form_post');
        target === null || target === void 0 ? void 0 : target.classList.remove('disabled');
        modalForm === null || modalForm === void 0 ? void 0 : modalForm.appendChild($inputCnt);
    }));
}
function modalCloser(bg, btn) {
    const targets = [bg, btn];
    targets.forEach(target => target === null || target === void 0 ? void 0 : target.addEventListener('click', (e) => {
        const eTargetToHTML = e.target;
        if (eTargetToHTML.id === 'modal_bg' || eTargetToHTML.id === 'btn_close') {
            const delTarget = bg === null || bg === void 0 ? void 0 : bg.querySelector('.del_target');
            const modalForm = bg === null || bg === void 0 ? void 0 : bg.querySelector('form#form_post');
            bg === null || bg === void 0 ? void 0 : bg.classList.add('disabled');
            if (delTarget) {
                modalForm === null || modalForm === void 0 ? void 0 : modalForm.removeChild(delTarget);
            }
        }
    }));
}
modalOpener(menuBtns, modalBg);
modalCloser(modalBg, modalCloseBtn);
const addBtn = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('button#btn_add');
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener('click', () => {
    const inputCtns = modalForm === null || modalForm === void 0 ? void 0 : modalForm.querySelectorAll('.input_container');
    const inputsArr = [];
    /* ########## input vs textarea 구분 메커니즘 필요 ########## */
    inputCtns === null || inputCtns === void 0 ? void 0 : inputCtns.forEach(inputCtn => {
        Array.from(inputCtn.childNodes)
            .filter(childNode => {
            const cnToHTML = childNode;
            if (cnToHTML.classList) {
                return cnToHTML.classList.contains('need_ext');
            }
        })
            .forEach(inptWithVal => inputsArr.push(inptWithVal));
    });
    inputsArr.forEach(inpt => console.log(inpt.value));
});
// 임시 작성
class SectionCreator extends ProtoPostCreator {
    constructor(menuType) {
        super();
        this.menuType = menuType;
    }
}
//# sourceMappingURL=index.js.map