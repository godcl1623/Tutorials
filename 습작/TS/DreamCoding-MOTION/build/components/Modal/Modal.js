import ComponentTemplate from '../Util/PseudoComp.js';
class Modal extends ComponentTemplate {
    constructor() {
        super(`
      <div id="modal_body">
        <div class="close_container">
          <button id="btn_close">×</button>
        </div>
        <form id="form_post">
          <div class="input_container">
            <label for="title">Title</label>
            <input name="title" class="title need_ext">
          </div>
          <div class="input_container ap_target"></div>
          <div class="btn_container">
            <button id="btn_add">ADD</button>
          </div>
        </form>
      </div>
    `);
    }
}
export default new Modal().render().innerHTML;
//# sourceMappingURL=Modal.js.map