import ComponentTemplate from '../../Util/PseudoComp.js';

export default class NotePost extends ComponentTemplate {
  private title: string;

  private body: string;

  constructor(title: string, body: string) {
    super(`
      <div class="posts_container">
        <h2></h2>
        <p></p>
      </div>
    `);
    this.title = title;
    this.body = body;
    const $h2 = this.container.querySelector('h2')! as HTMLHeadingElement;
    $h2.textContent = this.title;
    const $p = this.container.querySelector('p')! as HTMLParagraphElement;
    $p.textContent = this.body;
  }
}