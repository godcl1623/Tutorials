const test = () => {
    /* eslint-disable class-methods-use-this */
    var _a;
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
    const modalBg = document.querySelector('#modal');
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
            if (eTargetToHTML.id === 'modal' || eTargetToHTML.id === 'btn_close' || eTargetToHTML.id === 'btn_add') {
                bg === null || bg === void 0 ? void 0 : bg.classList.add('disabled');
            }
        }));
    }
    modalOpener(menuBtns, modalBg, modalForm);
    modalCloser(modalBg, modalCloseBtn);
    class Dnd {
        constructor() {
            this.chkLastIdx = (event) => {
                const eTargetToHTML = event.target;
                const parentOne = eTargetToHTML.parentElement;
                const parentsTwo = parentOne === null || parentOne === void 0 ? void 0 : parentOne.parentElement;
                const sectionLists = Array.from(Dnd.motionPosts.childNodes).filter(item => item.className);
                if (eTargetToHTML instanceof HTMLDivElement && eTargetToHTML.className) {
                    Dnd.lastElIdx = sectionLists.indexOf(parentOne);
                }
                else if (!eTargetToHTML.className) {
                    Dnd.lastElIdx = sectionLists.indexOf(parentsTwo);
                }
            };
            this.itemTopOrBot = (event) => {
                const eTargetToHTML = event.target;
                const parentOne = eTargetToHTML.parentElement;
                const parentsTwo = parentOne === null || parentOne === void 0 ? void 0 : parentOne.parentElement;
                if (eTargetToHTML instanceof HTMLDivElement) {
                    Dnd.clientCoords = parentOne === null || parentOne === void 0 ? void 0 : parentOne.getBoundingClientRect();
                }
                else if (!eTargetToHTML.className) {
                    Dnd.clientCoords = parentsTwo === null || parentsTwo === void 0 ? void 0 : parentsTwo.getBoundingClientRect();
                }
                const itemMid = Dnd.clientCoords.top + (Dnd.clientCoords.height / 2);
                if (event.clientY > itemMid) {
                    Dnd.lastElDir = 'bot';
                }
                else if (event.clientY < itemMid) {
                    Dnd.lastElDir = 'top';
                }
                else {
                    throw new Error('Section direction declaration error !');
                }
            };
            this.dragEventsController = (tgt) => {
                tgt.addEventListener('dragstart', (e) => {
                    Dnd.dragged = e.target;
                });
                tgt.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    this.chkLastIdx(e);
                    this.itemTopOrBot(e);
                });
            };
        }
    }
    _a = Dnd;
    Dnd.lastElDir = '';
    Dnd.initYCoord = 0;
    Dnd.lastElIdx = 0;
    Dnd.dragged = null;
    Dnd.motionPosts = document.querySelector('article#motion_posts');
    Dnd.dropEventsController = () => {
        _a.motionPosts.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        _a.motionPosts.addEventListener('drop', (e) => {
            e.preventDefault();
            // motionPosts nodeList
            // eslint-disable-next-line no-undef
            const sectionLists = Array.from(_a.motionPosts.childNodes)
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
            sectionLists.forEach(section => _a.motionPosts.removeChild(section));
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
            newList.forEach(section => _a.motionPosts.appendChild(section));
        });
    };
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
            dnd.dragEventsController($section);
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
                const $p = document.createElement('p');
                $p.textContent = body;
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
                $input.addEventListener('click', (e) => {
                    const eTargetToHTML = e.target;
                    const parentToHTML = eTargetToHTML.parentElement;
                    const textDeco = parentToHTML.childNodes[1].style.textDecoration;
                    if (textDeco === '' || textDeco === 'none') {
                        parentToHTML.childNodes[1].style.textDecoration = 'line-through';
                    }
                    else {
                        parentToHTML.childNodes[1].style.textDecoration = 'none';
                    }
                });
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
        motionPosts === null || motionPosts === void 0 ? void 0 : motionPosts.appendChild($section);
        selectedMenu = '';
        sectionCreator.itemId++;
    });
    Dnd.dropEventsController();
};
export default test;
//# sourceMappingURL=page.js.map