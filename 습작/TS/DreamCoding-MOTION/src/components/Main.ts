import ComponentTemplate from './PseudoComp.js';
import PostCreateDialog, { Payload } from './Dialog/Dialog.js';

class Main extends ComponentTemplate {
  constructor() {
    super(`
      <main id="motion_container">
        <article id="motion_posts">
          <!-- <div id="drop_zone"></div> -->
        </article>
      </main>
    `);
  }
}

export default new Main().render().innerHTML;