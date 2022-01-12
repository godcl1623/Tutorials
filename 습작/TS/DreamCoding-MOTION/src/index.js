var PostCreator = /** @class */ (function () {
    function PostCreator(menuType) {
        this.menuType = menuType;
    }
    PostCreator.prototype.baseModule = function (ipt) {
        var $div = document.createElement('div');
        $div.className = 'input_container del_target';
        var $label = document.createElement('label');
        $label.htmlFor = ipt.forVal;
        $label.textContent = ipt.labelTxt;
        $div.appendChild($label);
        return $div;
    };
    PostCreator.prototype.mediaPostCreator = function (ipt) {
        var $input = document.createElement('input');
        $input.name = ipt.nameVal;
        $input.className = ipt.classVal;
        return $input;
    };
    PostCreator.prototype.textPostCreator = function (ipt) {
        var $area = document.createElement('textarea');
        $area.name = ipt.nameVal;
        $area.className = ipt.classVal;
        return $area;
    };
    PostCreator.prototype.ctnCreator = function () {
        var result;
        if (this.menuType === 'IMAGE' || this.menuType === 'VIDEO') {
            var basePayload = {
                forVal: 'URL',
                labelTxt: 'URL'
            };
            var mediaPayload = {
                nameVal: 'URL',
                classVal: 'url'
            };
            var baseCnt = this.baseModule(basePayload);
            var mediaPost = this.mediaPostCreator(mediaPayload);
            baseCnt === null || baseCnt === void 0 ? void 0 : baseCnt.appendChild(mediaPost);
            result = baseCnt;
        }
        else {
            var basePayload = {
                forVal: 'Body',
                labelTxt: 'Body'
            };
            var txtPayload = {
                nameVal: 'Body',
                classVal: 'body'
            };
            var baseCnt = this.baseModule(basePayload);
            var txtPost = this.textPostCreator(txtPayload);
            baseCnt === null || baseCnt === void 0 ? void 0 : baseCnt.appendChild(txtPost);
            result = baseCnt;
        }
        return result;
    };
    return PostCreator;
}());
/* 2. 모달창 여닫기 */
var motionMenu = document.querySelector('#motion_menu');
var menuBtns = motionMenu === null || motionMenu === void 0 ? void 0 : motionMenu.querySelectorAll('.menu_items');
var modalBg = document.querySelector('#modal_bg');
var modalCloseBtn = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('.btn_close');
function modalOpener(btns, target) {
    btns === null || btns === void 0 ? void 0 : btns.forEach(function (btn) {
        return btn.addEventListener('click', function (e) {
            // null인 경우가 있을 수 있으므로 주의
            var eTargetToHTML = e.target;
            var postCreator = new PostCreator(eTargetToHTML.textContent);
            var $inputCnt = postCreator.ctnCreator();
            var modalForm = target === null || target === void 0 ? void 0 : target.querySelector('form#form_post');
            target === null || target === void 0 ? void 0 : target.classList.remove('disabled');
            modalForm === null || modalForm === void 0 ? void 0 : modalForm.appendChild($inputCnt);
        });
    });
}
function modalCloser(bg, btn) {
    var targets = [bg, btn];
    targets.forEach(function (target) {
        return target === null || target === void 0 ? void 0 : target.addEventListener('click', function (e) {
            var eTargetToHTML = e.target;
            if (eTargetToHTML.id === 'modal_bg' || eTargetToHTML.className === 'btn_close') {
                var delTarget = bg === null || bg === void 0 ? void 0 : bg.querySelector('.del_target');
                var modalForm = bg === null || bg === void 0 ? void 0 : bg.querySelector('form#form_post');
                bg === null || bg === void 0 ? void 0 : bg.classList.add('disabled');
                if (delTarget) {
                    modalForm === null || modalForm === void 0 ? void 0 : modalForm.removeChild(delTarget);
                }
            }
        });
    });
}
modalOpener(menuBtns, modalBg);
modalCloser(modalBg, modalCloseBtn);
