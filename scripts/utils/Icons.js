export default class Icons {
  static load(path) {
    path = path || 'assets/icons.svg';
    fetch(path)
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        const svg = document.createElement('div');
        svg.style.display = 'none';
        svg.innerHTML = data;
        document.body.appendChild(svg);
      });
  }
}
