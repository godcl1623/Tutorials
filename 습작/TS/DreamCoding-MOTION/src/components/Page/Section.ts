import ComponentTemplate from '../PseudoComp';

export type SectionPayload = {
  sectionClass?: string;
  imgWrapperClass?: string;
  titleWrapperClass?: string;
  postsCntClass?: string;
}

export default class _SectionCreator extends ComponentTemplate {
  private payload: SectionPayload;

  constructor(payload: SectionPayload) {
    super(`
      <section class="${payload.sectionClass}" draggable="true">
        <div class="close_container">
          <button class="btn_del">×</button>
        </div>
        <div class="posts_container">
          <h2></h2>
          <p></p>
        </div>
      </section>
    `);
    this.payload = payload;
    /* button.btn_del에 delPost 부여는 index.ts에서 진행할 것 */
    /* Dnd.dragEventController 부여는 일단 패스 */
  }
}