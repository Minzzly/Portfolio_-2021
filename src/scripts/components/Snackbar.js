import Cache from '../utils/Cache';

/** Composante Snackbar de TimTools */
export default class Snackbar {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;

    this.scrollPosition = 0; /** prend la scroll position dans la page web */
    this.snackDelay = this.element.dataset.snackbarDelay; /** va chercher le delay avant que le snackbar apparait */
    this.scrollLimit =
      this.element.dataset.snackbarScrollLimit; /** le pourcentage de la page que l'utilisateur scroll avant que le snackbar disparait (va chercher le pourcentage dans le fichier html)*/
    this.SnackHide =
      this.element.dataset.snackbarHide; /** une option qui peut etre changer dans le fichier html si le snackbar ce cache ou pas */
    this.lastScrollPosition = 0; /** cherche la derniere position du scroll */
    this.html = document.documentElement;

    this.hide = true;
    this.boutton = this.element.querySelector('.js-button'); //cherche le boutton pour fermer
    this.id = this.element.dataset.id;

    this.snackbarDown();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    this.checkCache();
    this.hide = false;
    this.html.classList.remove('snackbar-down');

    console.log('Nouvelle instance de la composante -> Snackbar');
    window.addEventListener('scroll', this.onScroll.bind(this));

    this.boutton.addEventListener('click', this.fermerSnackbar.bind(this));
  }

  snackbarDown() {
    this.html.classList.add('snackbar-down');
    setTimeout(() => {
      this.init();
    }, this.snackDelay);
  }

  checkCache() {
    const defaultTheme = Cache.get('snackbar');
    if (defaultTheme) {
      if (this.id == defaultTheme) {
        this.element.style.display = 'none';
      }
    }
  }

  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition; /** change la variable scroll pour la position actuel */
    this.scrollPosition = document.scrollingElement.scrollTop; /** cherche le scroll actuel */

    /** appelle les méthodes suivantes */
    this.setSnackbarState();
  }

  setSnackbarState() {
    /** si le headerHide est mis à "true", elle exécute la méthode */
    if (this.SnackHide == 'true' && this.hide == false) {
      const scrollHeight = document.scrollingElement.scrollHeight; /** cherche la hauteur du scroll */

      /** si le scroll Position et plus haut que le scrollHeight, l'html recoit la class header-is-hidden. sinon, la class est enlever */
      if (this.scrollPosition > scrollHeight * this.scrollLimit) {
        this.html.classList.add('snackbar-down');
      } else {
        this.html.classList.remove('snackbar-down');
      }
    }
  }

  fermerSnackbar() {
    this.html.classList.add('snackbar-down');

    this.hide = true;

    if (this.id == null) {
      this.id = '1';
    }

    Cache.set('snackbar', this.id, true);
  }
}
