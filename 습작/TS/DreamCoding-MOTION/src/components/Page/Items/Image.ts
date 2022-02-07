import ComponentTemplate from '../../PseudoComp.js';

export default class ImagePost extends ComponentTemplate {
  private title: string;

  private url: string;

  constructor(title: string, url: string) {
    super(`
      <div class="posts_title">
        <h2></h2>
      </div>
      <div class="image_wrapper">
        <img src="" alt="img">
      </div>
    `);
    this.title = title;
    this.url = url;
    const $title = this.container.querySelector('h2')! as HTMLHeadingElement;
    const $img = this.container.querySelector('img')! as HTMLImageElement;
    $title.textContent = this.title;
    $img.src = this.url;
  }
}