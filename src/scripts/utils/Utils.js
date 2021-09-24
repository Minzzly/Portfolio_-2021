/** Classe utilitaires statiques (pas besoin d'instancier cette classe) */
export default class Utils {
  /**
   * Retourne un string où les valeurs spécifiées ont été remplacées
   * @param {string} content - texte contenant les éléments à remplacer entourées par {{}}
   * @param {object} data - Clés / valeurs à chercher et à remplacer
   * @return {string} Retourne le contenu avec les clés remplacées
   */
  static parseTemplate(content, data) {
    for (const key in data) {
      const regex = new RegExp(`\{\{${key}\}\}`, 'gi');
      content = content.replace(regex, data[key]);
    }

    return content;
  }
}
