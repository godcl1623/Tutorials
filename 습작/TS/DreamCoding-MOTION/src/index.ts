import TempDOM from './components/App.js';
import TotalComponent from './components/page.js';
import TempComponent from './components/temp.js';

const app = document.querySelector('div#App');

TempDOM.render(app! as HTMLDivElement);
TotalComponent();