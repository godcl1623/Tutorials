class App {
  // constructor(private appRoot: HTMLDivElement) {}
  render(appRoot: HTMLDivElement) {
    appRoot.innerHTML = `
    <article id="motion_container">
      <nav id="motion_menu">
        <h1>MOTION</h1>
        <ul id="motion_menu_btns">
          <li class="menu_items">
            <button class="menu_btn">IMAGE</button>
          </li>
          <li class="menu_items">
            <button class="menu_btn">VIDEO</button>
          </li>
          <li class="menu_items">
            <button class="menu_btn">NOTE</button>
          </li>
          <li class="menu_items">
            <button class="menu_btn">TASK</button>
          </li>
        </ul>
      </nav>
      <article id="motion_posts">
        <!-- <div id="drop_zone"></div> -->
      </article>
      <footer id="motion_cr">
        <p id="cr_text">
          ⓒ Copyright by Dream Coding Academy. All rights reserved.
        </p>
      </footer>
    </article>
    <div id="modal_bg" class="disabled">
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
    </div>
    `;
  }
}

export default new App();