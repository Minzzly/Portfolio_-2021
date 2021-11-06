/** Composante Loader de Timtools */
export default class Loader {
    /**
     * Méthode constructeur
     * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
     */
    constructor(element) {
        this.element = element;
        this.pageAccueil = document.querySelector('.accueil');
        this.html = document.documentElement;

        this.init();
    }

    /**
     * Méthode d'initialisation
     */
    init() {
        if (this.pageAccueil) {
            window.addEventListener('load', this.timer.bind(this));
        }

        else {
            window.addEventListener('load', this.loading.bind(this));
        }

    }

    timer() {
        setTimeout(this.loading.bind(this), 3000);
    }

    loading() {
        this.html.classList.add('loaderFade');
        setTimeout(this.enleveLoader.bind(this), 1000);
    }

    enleveLoader() {
        console.log(this.element.parentElement);
        this.element.parentElement.removeChild(this.element);
    }
}
