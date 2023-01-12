import Utils from '../utils/Utils';

export default class Modal {
  constructor(element) {
    this.element = element; /** va chercher les datas dans l'html */
    this.modalId = this.element.dataset.modalId; /** chercher les data avec le nom modalId */
    this.init(); /** appelle la méthode init */
  }

  init() {
    /** ajoute un événement clique sur les éléments qui appelle la méthode open*/
    this.element.addEventListener('click', this.open.bind(this));

    this.close = this.close.bind(this); /** appelle la méthode close dans une variable */
  }

  updateContent() {
    /** ajoute les informations dans la modal (title et source)  */
    if (this.modalId == 'tpl-modal-images') {
      /** si la modal c'est celle de tpl-modal-partenaires */
      this.modalElement.innerHTML = Utils.parseTemplate(this.modalElement.innerHTML, {
        title: this.element.dataset.modalTitle /** modifie le titre de la modal */,
        source: this.element.dataset.modalSource /** modifie la source de l'image de la modal */,
      });
    } else if (this.modalId == 'tpl-modal-calendrier') {
      /** si la modal c'est celle de tpl-modal-calendrier */
      this.modalElement.innerHTML = Utils.parseTemplate(this.modalElement.innerHTML, {
        title: this.element.dataset.modalTitle /** modifie le titre de la modal */,
        source: this.element.dataset.modalSource /** modifie la source de l'image de la modal */,
        salle: this.element.dataset.modalSalle /** modifie la salle de la modal */,
        description: this.element.dataset.modalDescription /** modifie la description de la modal */,
      });
    }
  }

  open(event) {
    event.preventDefault();

    this.appendModal(); //affiche le modal
  }

  close(event) {
    /** si la touche appuiyer et égal à nul et que ce n'est pas la touche ESC, la méthode va etre ignorer */
    if (event.keyCode != null && event.keyCode != 27) {
      return;
    }

    /** enleve la class modal-is-active, l'événement clique et de keydown */
    document.documentElement.classList.remove('modal-is-active');
    this.closeButton.removeEventListener('click', this.close.bind(this));
    document.removeEventListener('keydown', this.close);

    /** appelle la méthode destroy après 1 seconde */
    setTimeout(this.destroy.bind(this), 1000);
  }

  destroy() {
    /** enleve la modal du html */
    this.modalElement.parentElement.removeChild(this.modalElement);
  }

  appendModal() {
    const template = document.querySelector(`#${this.modalId}`); /** va chercher la template */

    if (template) {
      this.modalElement =
        template.content.firstElementChild.cloneNode(true); /** va chercher la modal dans le template */

      this.content =
        this.modalElement.querySelector('.modal_content'); /** va chercher le modal_content qui est dans la modal */

      this.updateContent(); /** update la modal */

      document.body.appendChild(this.modalElement);

      this.element.getBoundingClientRect();
      document.documentElement.classList.add('modal-is-active'); /** ajoute la class modal-is-active dans le html */

      this.closeButton =
        this.modalElement.querySelector('.js-close'); /** va chercher le boutton pour fermer la modal */
      this.closeButton.addEventListener('click', this.close); /** ajoute un événement lorsque le bouton est cliquer */
    } else {
      console.log(`La <template> avec le id ${this.modalId} n'existe pas`); /** si le modal n'est pas trouver */
    }
    document.addEventListener('keydown', this.close); /** ajoute unn événement quand une touche est appuyer */
  }
}
