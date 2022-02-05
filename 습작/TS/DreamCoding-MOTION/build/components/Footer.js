import { ComponentTemplate } from './PseudoComp.js';
class Footer extends ComponentTemplate {
    constructor() {
        super(`
      <footer id="motion_cr">
        <p id="cr_text">
          ⓒ Copyright by Dream Coding Academy. All rights reserved.
        </p>
      </footer>
    `);
    }
}
export default new Footer().render().innerHTML;
//# sourceMappingURL=Footer.js.map