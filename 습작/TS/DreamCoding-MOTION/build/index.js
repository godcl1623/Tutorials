"use strict";
class ProtoPostCreator {
}
class PostCreator extends ProtoPostCreator {
    // eslint-disable-next-line no-unused-vars
    constructor(menuType) {
        super();
        this.menuType = menuType;
    }
    baseModule(ipt) {
        const $label = document.createElement('label');
        $label.htmlFor = ipt.forVal;
        $label.textContent = ipt.labelTxt;
        return $label;
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
            result = [baseCnt, mediaPost];
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
            result = [baseCnt, txtPost];
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
let selectedMenu = '';
function modalOpener(
// eslint-disable-next-line no-undef
btns, modalBg, modalForm) {
    btns === null || btns === void 0 ? void 0 : btns.forEach(btn => btn.addEventListener('click', (e) => {
        // null인 경우가 있을 수 있으므로 주의
        const eTargetToHTML = e.target;
        selectedMenu = eTargetToHTML.textContent;
        const postCreator = new PostCreator(eTargetToHTML.textContent);
        const $inputCnt = postCreator.ctnCreator();
        const targetCtn = modalForm === null || modalForm === void 0 ? void 0 : modalForm.querySelector('.ap_target');
        modalBg === null || modalBg === void 0 ? void 0 : modalBg.classList.remove('disabled');
        const titleVal = modalForm === null || modalForm === void 0 ? void 0 : modalForm.childNodes[1].childNodes[3];
        if (titleVal.value !== '')
            titleVal.value = '';
        if ((targetCtn === null || targetCtn === void 0 ? void 0 : targetCtn.childNodes.length) === 0) {
            $inputCnt.forEach(item => targetCtn === null || targetCtn === void 0 ? void 0 : targetCtn.appendChild(item));
        }
        else {
            $inputCnt.forEach((item, idx) => targetCtn === null || targetCtn === void 0 ? void 0 : targetCtn.replaceChild(item, targetCtn.childNodes[idx]));
        }
    }));
}
function modalCloser(bg, btn) {
    const targets = [bg, btn];
    targets.forEach(target => target === null || target === void 0 ? void 0 : target.addEventListener('click', (e) => {
        const eTargetToHTML = e.target;
        if (eTargetToHTML.id === 'modal_bg' || eTargetToHTML.id === 'btn_close' || eTargetToHTML.id === 'btn_add') {
            bg === null || bg === void 0 ? void 0 : bg.classList.add('disabled');
        }
    }));
}
modalOpener(menuBtns, modalBg, modalForm);
modalCloser(modalBg, modalCloseBtn);
class Dnd {
    constructor() {
        this.clientCoords = {};
        this.lastElDir = '';
        this.initYCoord = 0;
        this.lastElIdx = 0;
        // isClicked: boolean = false;
        // isMoving: boolean = false;
        // isDragging: boolean = false;
        this.dragged = null;
        this.motionPosts = document.querySelector('article#motion_posts');
        this.chkLastIdx = (event) => {
            const eTargetToHTML = event.target;
            const parentOne = eTargetToHTML.parentElement;
            const parentsTwo = parentOne === null || parentOne === void 0 ? void 0 : parentOne.parentElement;
            const sectionLists = Array.from(this.motionPosts.childNodes).filter(item => item.className);
            if (eTargetToHTML instanceof HTMLDivElement) {
                this.lastElIdx = sectionLists.indexOf(parentOne);
            }
            else if (!eTargetToHTML.className) {
                this.lastElIdx = sectionLists.indexOf(parentsTwo);
            }
        };
        this.itemTopOrBot = (event) => {
            const eTargetToHTML = event.target;
            const parentOne = eTargetToHTML.parentElement;
            const parentsTwo = parentOne === null || parentOne === void 0 ? void 0 : parentOne.parentElement;
            if (eTargetToHTML instanceof HTMLDivElement) {
                this.clientCoords = parentOne === null || parentOne === void 0 ? void 0 : parentOne.getBoundingClientRect();
            }
            else if (!eTargetToHTML.className) {
                this.clientCoords = parentsTwo === null || parentsTwo === void 0 ? void 0 : parentsTwo.getBoundingClientRect();
            }
            const itemMid = this.clientCoords.top + (this.clientCoords.height / 2);
            if (event.clientY > itemMid) {
                console.log('bot', this.lastElIdx);
            }
            else if (event.clientY < itemMid) {
                console.log('top', this.lastElIdx);
            }
        };
        this.eventsController = (tgt) => {
            // this.motionPosts.addEventListener('dragstart', (e: DragEvent) => { this.initYCoord = e.pageY});
            // this.motionPosts.addEventListener('dragover', (e: DragEvent) => {
            //   e.preventDefault();
            //   this.chkLastIdx(e);
            //   // console.log(this.initYCoord, e.pageY)
            // });
            tgt.addEventListener('dragover', e => {
                e.preventDefault();
                this.chkLastIdx(e);
                this.itemTopOrBot(e);
            });
            // this.motionPosts.addEventListener('drop', e => {
            //   const currentYCoord = e.clientY;
            //   if (currentYCoord - this.initYCoord > 0) {
            //     this.lastElDir = 'down';
            //   } else if (currentYCoord - this.initYCoord < 0) {
            //     this.lastElDir = 'up';
            //   }
            //   console.log(this.lastElDir)
            // })
            this.motionPosts.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            this.motionPosts.addEventListener('drop', (e) => {
                e.preventDefault();
                console.log('foo');
            });
        };
    }
}
// 임시 작성
class SectionCreator extends ProtoPostCreator {
    constructor(
    // eslint-disable-next-line no-unused-vars
    menuType, 
    // eslint-disable-next-line no-unused-vars
    title, 
    // eslint-disable-next-line no-unused-vars
    url, 
    // eslint-disable-next-line no-unused-vars
    body) {
        super();
        this.menuType = menuType;
        this.title = title;
        this.url = url;
        this.body = body;
    }
    get itemId() {
        return SectionCreator._itemId;
    }
    set itemId(val) {
        SectionCreator._itemId = val;
    }
    /* 4. 포스트 삭제 메커니즘 */
    delPost(e) {
        const eTargetToHTML = e.target;
        const delTarget = eTargetToHTML.parentNode.parentNode;
        // const motionPosts = document.querySelector('article#motion_posts') as HTMLElement;
        // const delCnt = motionPosts.querySelector('div#drop_zone');
        const delCnt = document.querySelector('article#motion_posts');
        delCnt === null || delCnt === void 0 ? void 0 : delCnt.removeChild(delTarget);
    }
    baseModule(ipt) {
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
    }
    ;
    mediaPostCreator(ipt, url, title) {
        const mediaCnt = document.createElement('div');
        mediaCnt.className = ipt.imgWrapperClass;
        if (this.menuType === 'IMAGE') {
            const $img = document.createElement('img');
            $img.src = url;
            $img.alt = 'img';
            mediaCnt.appendChild($img);
        }
        else {
            const $iframe = document.createElement('iframe');
            const rawUrl = url.includes('=') ? url.split('=') : url.split('/');
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
    }
    ;
    textPostCreator(ipt, body, title) {
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
        }
        else {
            const $h2 = document.createElement('h2');
            $h2.textContent = title;
            const bodyCnt = document.createElement('div');
            const $input = document.createElement('input');
            $input.type = 'checkbox';
            $input.name = 'checkbox';
            const $label = document.createElement('label');
            $label.htmlFor = 'checkbox';
            $label.textContent = body;
            bodyCnt.appendChild($input);
            bodyCnt.appendChild($label);
            postCnt.appendChild($h2);
            postCnt.appendChild(bodyCnt);
        }
        return postCnt;
    }
    ;
    ctnCreator() {
        let result;
        if (this.menuType === 'IMAGE') {
            const sectionBase = {
                sectionClass: 'media image'
            };
            const sectionMedia = {
                imgWrapperClass: 'image_wrapper',
                titleWrapperClass: 'posts_title'
            };
            const baseCnt = this.baseModule(sectionBase);
            const mediaPost = this.mediaPostCreator(sectionMedia, this.url, this.title);
            mediaPost.forEach(media => baseCnt.appendChild(media));
            result = baseCnt;
        }
        else if (this.menuType === 'VIDEO') {
            const sectionBase = {
                sectionClass: 'media video'
            };
            const sectionMedia = {
                imgWrapperClass: 'video_wrapper',
                titleWrapperClass: 'posts_title'
            };
            const baseCnt = this.baseModule(sectionBase);
            const mediaPost = this.mediaPostCreator(sectionMedia, this.url, this.title);
            mediaPost.forEach(media => baseCnt.appendChild(media));
            result = baseCnt;
        }
        else if (this.menuType === 'NOTE') {
            const sectionBase = {
                sectionClass: 'posts note'
            };
            const sectionTxt = {
                postsCntClass: 'posts_container'
            };
            const baseCnt = this.baseModule(sectionBase);
            const txtPost = this.textPostCreator(sectionTxt, this.body, this.title);
            baseCnt.appendChild(txtPost);
            result = baseCnt;
        }
        else {
            const sectionBase = {
                sectionClass: 'posts task'
            };
            const sectionTxt = {
                postsCntClass: 'posts_container'
            };
            const baseCnt = this.baseModule(sectionBase);
            const txtPost = this.textPostCreator(sectionTxt, this.body, this.title);
            baseCnt.appendChild(txtPost);
            result = baseCnt;
        }
        return result;
    }
    ;
}
SectionCreator._itemId = 0;
modalForm === null || modalForm === void 0 ? void 0 : modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eTargetToHTML = e.target;
    const formVals = [];
    const motionPosts = document.querySelector('article#motion_posts');
    const dropZone = motionPosts.querySelector('div#drop_zone');
    let $section;
    let sectionCreator;
    Object.keys(eTargetToHTML)
        .slice(0, 2)
        .forEach(key => formVals.push(eTargetToHTML[key].value));
    if (selectedMenu === 'IMAGE' || selectedMenu === 'VIDEO') {
        sectionCreator = new SectionCreator(selectedMenu, formVals[0], formVals[1]);
        $section = sectionCreator.ctnCreator();
    }
    else {
        sectionCreator = new SectionCreator(selectedMenu, formVals[0], '', formVals[1]);
        $section = sectionCreator.ctnCreator();
    }
    // dropZone?.appendChild($section);
    motionPosts === null || motionPosts === void 0 ? void 0 : motionPosts.appendChild($section);
    selectedMenu = '';
    sectionCreator.itemId++;
});
//# sourceMappingURL=index.js.map