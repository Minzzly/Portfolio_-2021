import Carousel from './components/Carousel';
import Form from './components/Form';
import Header from './components/Header';
import Video from './components/Video';
import Scrolly from './components/Scrolly';
import Modal from './components/Modal';
import Snackbar from './components/Snackbar';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Carousel,
      Form,
      Video,
      Header,
      Scrolly,
      Modal,
      Snackbar,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
