import Header from './Parts/Header.js';
import Main from './Parts/Main.js';
import Footer from './Parts/Footer.js';
class App {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'App';
        const components = [Header, Main, Footer];
        components.forEach(component => { this.container.innerHTML += component; });
    }
    render() {
        return this.container;
    }
}
const AppComponent = new App();
export default AppComponent.render().innerHTML;
//# sourceMappingURL=App.js.map