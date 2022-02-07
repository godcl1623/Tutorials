import ComponentTemplate from '../../Util/PseudoComp.js';

class MenuBtns extends ComponentTemplate {
  private menuTxt: string;

  private menuBtn: HTMLButtonElement;

  constructor(menuTxt: string) {
    super(`
      <li class="menu_items">
        <button class="menu_btn"></button>
      </li>
    `);
    this.menuTxt = menuTxt;
    this.menuBtn = this.container.querySelector('button.menu_btn')! as HTMLButtonElement;
    this.menuBtn.textContent = this.menuTxt;
  }

  attachTo(cntRoot: HTMLElement): void {
    cntRoot.appendChild(this.container.querySelector('li')! as HTMLLIElement);
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
      menu.attachTo(ul! as HTMLUListElement);
    });
  }
}

export default new Header().render().innerHTML;
