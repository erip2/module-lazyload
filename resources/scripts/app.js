import './publicPath';
import {componentsList} from './componentsList';

/**
 * Run the application when the DOM is ready.
 */
export default class App {
  get COMPONENTS_LIST() {
    return [...componentsList];
  }

  init() {
    this.initFromListComponents();
  }

  initFromListComponents() {
    this.COMPONENTS_LIST.forEach((component) => {
      this.instanceComponent(component);
    });
  }

  instanceComponent(ComponentName) {
    let selector = `[data-js-component="${ComponentName}"]:not([data-js-loaded])`;
    let componentElements = document.querySelectorAll(selector);
    if (componentElements.length > 0) {
      this.importComponents(ComponentName)
        .then(({default: Component}) => {
          componentElements.forEach((element) => {
            let component = new Component(element);
            component.init();
          });
        })
        .catch((err) => {
          console.warn(err, err.stack);
        });
    }
  }

  /* --------------------------------------------------------------------- */
  /* this method import a module and returns the import promise            */
  /* with this method we centralize the dynamic import                     */
  /* --------------------------------------------------------------------- */
  async importComponents(componentName) {
    return await import('./components/' + componentName);
  }
}

let app = new App();
app.init();

/**
 * Accept module updates
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
import.meta.webpackHot?.accept(console.error);
