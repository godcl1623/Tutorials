import ComponentTemplate from '../PseudoComp.js';
export default class SectionCreator extends ComponentTemplate {
    // private title: string;
    // private url?: string;
    // private body?: string;
    // constructor(menuType: string, title: string, url?: string, body?: string) {
    constructor(menuType) {
        super(`
      <section draggable="true">
        <div class="close_container">
          <button class="btn_del">×</button>
        </div>
      </section>
    `);
        // this.payload = payload;
        this.menuType = menuType;
        // this.title = title;
        // this.url = url;
        // this.body = body;
        this.$section = this.container.querySelector('section');
        this.$section.className = this.menuType === 'IMAGE' || this.menuType === 'VIDEO' ? 'media' : 'posts';
        /* button.btn_del에 delPost 부여는 index.ts에서 진행할 것 */
        /* Dnd.dragEventController 부여는 일단 패스 */
    }
    render() {
        return this.$section;
    }
}
//# sourceMappingURL=Section.js.map