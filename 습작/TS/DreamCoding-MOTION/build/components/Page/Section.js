import ComponentTemplate from '../PseudoComp.js';
export default class SectionCreator extends ComponentTemplate {
    constructor(menuType) {
        super(`
      <section draggable="true">
        <div class="close_container">
          <button class="btn_del">×</button>
        </div>
      </section>
    `);
        this.menuType = menuType;
        this.$section = this.container.querySelector('section');
        this.$section.className = this.menuType === 'IMAGE' || this.menuType === 'VIDEO' ? 'media' : 'posts';
    }
    render() {
        return this.$section;
    }
}
//# sourceMappingURL=Section.js.map