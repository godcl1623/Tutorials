/* 1. 모달창 여닫기 */
var motionMenu = document.querySelector('#motion_menu');
var menuBtns = motionMenu === null || motionMenu === void 0 ? void 0 : motionMenu.querySelectorAll('.menu_items');
var modalBg = document.querySelector('#modal_bg');
var modalCloseBtn = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('.btn_close');
function modalOpener(btns, target) {
    btns === null || btns === void 0 ? void 0 : btns.forEach(function (btn) {
        return btn.addEventListener('click', function () {
            // null인 경우가 있을 수 있으므로 주의
            target === null || target === void 0 ? void 0 : target.classList.remove('disabled');
        });
    });
}
function modalCloser(bg, btn) {
    var targets = [bg, btn];
    targets.forEach(function (target) {
        return target === null || target === void 0 ? void 0 : target.addEventListener('click', function () {
            bg === null || bg === void 0 ? void 0 : bg.classList.add('disabled');
        });
    });
}
modalOpener(menuBtns, modalBg);
modalCloser(modalBg, modalCloseBtn);
/* 2. 추가 메뉴 모듈화 */
var PostCreator = /** @class */ (function () {
    function PostCreator() {
        this.modalBody = modalBg === null || modalBg === void 0 ? void 0 : modalBg.querySelector('#modal_body');
    }
    PostCreator.prototype.ctnCreator = function (className, labelTxt, forTxt, nameTxt, clsNameTxt) {
        var result;
        var $div = document.createElement('div');
        $div.className = className;
        if (className === 'close_container') {
            var $btn = document.createElement('button');
            $btn.className = 'btn_close';
            $btn.textContent = '×';
            $div.appendChild($btn);
            result = $div;
        }
        else if (className === 'input_container') {
            if (labelTxt && forTxt && nameTxt && clsNameTxt) {
                var $label = document.createElement('label');
                $label.htmlFor = forTxt;
                $label.textContent = labelTxt;
                var $input = document.createElement('input');
                $input.name = nameTxt;
                $input.className = clsNameTxt;
                $div.appendChild($label);
                $div.appendChild($input);
                result = $div;
            }
            else {
                throw new Error('Unexpected error occured: Some of txt values are undefined');
            }
        }
        else if (className === 'btn_container') {
            var $btn = document.createElement('button');
            $btn.className = 'btn_add';
            $btn.textContent = 'ADD';
            $div.appendChild($btn);
            result = $div;
        }
        return result;
    };
    return PostCreator;
}());
// const $div = elmCreator('div');
// const $label = elmCreator('label');
// const $input = elmCreator('input');
// const $textarea = elmCreator('textarea');
