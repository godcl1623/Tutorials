import Header from './Parts/Header.js';
import Main from './Parts/Main.js';
import Footer from './Parts/Footer.js';

class App {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'App';
    const components = [Header, Main, Footer];
    components.forEach(component => { this.container.innerHTML += component });
  }

  render(): HTMLDivElement {
    return this.container;
  }
}

const AppComponent = new App();
export default AppComponent.render().innerHTML;