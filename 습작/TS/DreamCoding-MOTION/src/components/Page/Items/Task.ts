import ComponentTemplate from '../../PseudoComp.js';

export default class TaskPost extends ComponentTemplate {
  private title: string;

  private body: string;

  constructor(title: string, body: string) {
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
    const $title = this.container.querySelector('h2')! as HTMLHeadingElement;
    const $body = this.container.querySelector('label')! as HTMLLabelElement;
    $title.textContent = this.title;
    $body.textContent = this.body;
  }
}