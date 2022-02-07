import ComponentTemplate from '../../Util/PseudoComp.js';
export default class ImagePost extends ComponentTemplate {
    constructor(title, url) {
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
        const $title = this.container.querySelector('h2');
        const $img = this.container.querySelector('img');
        $title.textContent = this.title;
        $img.src = this.url;
    }
}
//# sourceMappingURL=Image.js.map