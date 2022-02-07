import ComponentTemplate from '../../Util/PseudoComp.js';
export default class NotePost extends ComponentTemplate {
    constructor(title, body) {
        super(`
      <div class="posts_container">
        <h2></h2>
        <p></p>
      </div>
    `);
        this.title = title;
        this.body = body;
        const $h2 = this.container.querySelector('h2');
        $h2.textContent = this.title;
        const $p = this.container.querySelector('p');
        $p.textContent = this.body;
    }
}
//# sourceMappingURL=Note.js.map