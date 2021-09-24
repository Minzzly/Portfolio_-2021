import Swiper from 'swiper/bundle';

/** Composante Carousel de Timtools */
export default class Carousel {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;

    // Options par défaut pour la librairie Swiper
    this.defaultOptions = {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      breakpoints: {
        769: {
          slidesPerView: 4,
          direction: 'horizontal',
        },
        376: {
          slidesPerView: 2,
          direction: 'horizontal',
        },
      },
    };

    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    let options = this.defaultOptions;

    // Gestion des paramètres différents lorsqu'on veut avoir
    // 2 slides visibles sur grand écran et une seule sur petit écran
    if (this.element.dataset.carousel == 'coverflow') {
      options = {
        ...this.defaultOptions,
        ...{
          slidesPerView: 3,
          direction: 'vertical',
          effect: 'coverflow',
          breakpoints: {
            768: {
              slidesPerView: 3,
              direction: 'horizontal',
            },
          },
          coverflowEffect: {
            rotate: 10,
            slideShadows: false,
          },
        },
      };
    }

    // Instanciation d'un nouveau Swiper avec les options
    new Swiper(this.element, options);
  }
}
