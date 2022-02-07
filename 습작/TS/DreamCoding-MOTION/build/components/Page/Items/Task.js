import ComponentTemplate from '../../PseudoComp.js';
export default class TaskPost extends ComponentTemplate {
    constructor(title, body) {
        super(`
      <div class="posts_container">
        <h2></h2>
        <div>
          <input type="checkbox" name="checkbox">
          <label for="checkbox"></label>
        </div>
      </div>
    `);
        this.title = title;
        this.body = body;
        const $title = this.container.querySelector('h2');
        const $body = this.container.querySelector('label');
        $title.textContent = this.title;
        $body.textContent = this.body;
    }
}
//# sourceMappingURL=Task.js.map