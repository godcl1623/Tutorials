import ComponentTemplate from '../../PseudoComp.js';

export default class VideoPost extends ComponentTemplate {
  private title: string;

  private rawUrl: string;

  constructor(title: string, url: string) {
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
    const $title = this.container.querySelector('h2')! as HTMLHeadingElement;
    const $iframe = this.container.querySelector('iframe')! as HTMLIFrameElement;
    $title.textContent = this.title;
    const processedUrl: string[] = this.rawUrl.includes('=') ? this.rawUrl.split('=') : this.rawUrl.split('/');
    $iframe.src = `https://www.youtube.com/embed/${processedUrl[processedUrl.length - 1]}`;
    $iframe.title = 'YouTube video player';
    $iframe.frameBorder = '0';
    $iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    $iframe.allowFullscreen = true;
  }
}