import ComponentTemplate from '../PseudoComp.js';

export default class SectionCreator extends ComponentTemplate {
  private menuType: string;

  private $section: null | HTMLElement;

  constructor(menuType: string) {
    super(`
      <section draggable="true">
        <div class="close_container">
          <button class="btn_del">×</button>
        </div>
      </section>
    `);
    this.menuType = menuType;
    this.$section = this.container.querySelector('section')! as HTMLElement;
    this.$section.className = this.menuType === 'IMAGE' || this.menuType === 'VIDEO' ? 'media' : 'posts';
  }

  render(): HTMLElement {
    return (this.$section! as HTMLElement);
  }
}