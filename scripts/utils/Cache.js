/** Componsante Cache de TimTools */
export default class Cache {
  /**
   * Permet d'ajouter un item dans le localStorage
   * @param {string} key - nom de la clef pour recupérer l'information par la suite
   * @param {string} value - la valeur de l'information qu'on veut sauvegarder
   * @param {boolean} force - Force la ré-écriture de la clef
   */
  static set(key, value, force) {
    if (key === undefined) {
      console.error("Vous n'avez pas fournis un clef pour l'écriture de votre information");
    } else if (value === undefined) {
      console.error("Vous n'avez pas fournis de valeur pour l'écriture de votre information");
    } else if (Cache.isLocalStorageAvailable()) {
      console.log('Cache.get(key) = ' + Cache.get(key));
      if (!Cache.get(key) || force === true) {
        key = `TT_${key}`;
        localStorage.setItem(key, value);
      } else {
        console.error('La clef que vous avez fourni est déjà utiliser. Forcer au besoin');
      }
    }
  }

  /**
   * Permet d'aller récupéré une valeur dans le localStorage
   * @param {string} key - nom de la clef à récuprérer
   * @param {string} defaultValue - Valeur par défaut, s'il ne trouve aucune valeur avec la clef fourni
   */
  static get(key, defaultValue) {
    if (key === undefined) {
      console.error("Vous n'avez pas fournis un clef à récupéré");
    } else if (Cache.isLocalStorageAvailable()) {
      key = `TT_${key}`;
      console.log(key);
      return localStorage.getItem(key) ? localStorage.getItem(key) : defaultValue;
    }
  }

  /**
   * Permet d'aller supprimer une clef dans le localStorage
   * @param {string} key - nom de la clef à supprimer
   */
  static remove(key) {
    if (key === undefined) {
      console.error("Vous n'avez pas fournis un clef à récupéré");
    } else if (Cache.isLocalStorageAvailable()) {
      key = `TT_${key}`;
      localStorage.removeItem(key);
    }
  }

  /**
   * Méthode qui test si le navigateur permet l'utilisation de localStorage
   */
  static isLocalStorageAvailable() {
    let test = '__timTools__';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.error("LocalStorage n'est pas disponible sur votre navigateur");
      return false;
    }
  }
}
