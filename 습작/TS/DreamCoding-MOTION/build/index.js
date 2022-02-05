import TempDOM from './components/PseudoComp.js';
import App from './components/App.js';
import TotalComponent from './components/page.js';
import Modal from './components/Modal.js';
const root = document.querySelector('div#root');
const modal = document.querySelector('div#modal');
TempDOM.render(App, root);
TempDOM.createPortal(Modal, modal);
TotalComponent();
//# sourceMappingURL=index.js.map