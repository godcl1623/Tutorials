class MenuBtns {
    constructor(menuTxt) {
        this.menuTxt = menuTxt;
        this.container = document.createElement('li');
        this.container.setAttribute('class', 'menu_items');
        const btn = document.createElement('button');
        btn.setAttribute('class', 'menu_btn');
        btn.textContent = menuTxt;
        this.container.appendChild(btn);
    }
    attachTo(cntRoot) {
        cntRoot.appendChild(this.container);
    }
}
class Header {
    constructor() {
        this.container = document.createElement('div');
        this.header = document.createElement('header');
        this.nav = document.createElement('nav');
        this.nav.setAttribute('id', 'motion_menu');
        this.heading = document.createElement('h1');
        this.heading.textContent = 'MOTION';
        this.ul = document.createElement('ul');
        this.ul.setAttribute('id', 'motion_menu_btns');
        this.container.appendChild(this.header);
        this.header.appendChild(this.nav);
        this.nav.appendChild(this.heading);
        this.nav.appendChild(this.ul);
        const image = new MenuBtns('IMAGE');
        const video = new MenuBtns('VIDEO');
        const note = new MenuBtns('NOTE');
        const task = new MenuBtns('TASK');
        const menus = [image, video, note, task];
        menus.forEach(menu => menu.attachTo(this.ul));
    }
    render() {
        return this.container;
    }
}
const HeaderComponent = new Header();
export default HeaderComponent.render().innerHTML;
//# sourceMappingURL=Header.js.map