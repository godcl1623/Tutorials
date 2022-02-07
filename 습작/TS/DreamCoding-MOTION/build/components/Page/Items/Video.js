import ComponentTemplate from '../../PseudoComp.js';
export default class VideoPost extends ComponentTemplate {
    constructor(title, url) {
        super(`
      <div class="posts_title">
        <h2></h2>
      </div>
      <div class="video_wrapper">
        <iframe></iframe>
      </div>
    `);
        this.title = title;
        this.rawUrl = url;
        const $title = this.container.querySelector('h2');
        const $iframe = this.container.querySelector('iframe');
        $title.textContent = this.title;
        const processedUrl = this.rawUrl.includes('=') ? this.rawUrl.split('=') : this.rawUrl.split('/');
        $iframe.src = `https://www.youtube.com/embed/${processedUrl[processedUrl.length - 1]}`;
        $iframe.title = 'YouTube video player';
        $iframe.frameBorder = '0';
        $iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        $iframe.allowFullscreen = true;
    }
}
//# sourceMappingURL=Video.js.map