//Ekstraktujem klasu odmah, licno nju, jer necu kreirati nikakvu instancu ovde
import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Darko Mitrovic
   * @todo Finish implementation
   */
  render(data, render = true) {
    //Pravljenje gresaka
    //Ako nema podatka ili ima podatka, ali je njegova duzina 0
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); //Ne stavim kao parametar nista, jer imam po defaultu poruku, koja se nalazi u fajlu resultsView.js

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Algoritam za azuriranje
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup); //Ovo je kao virtual DOM
    const newElements = Array.from(newDOM.querySelectorAll("*")); //Vraca Node Listu, a kad stavim Array.from, vraca niz
    //console.log(newElements);

    const curElements = this._parentElement.querySelectorAll("*");
    //console.log(curElements); //Dobijam trenutni element
    //console.log(newElements); //Dobijam element koji je za stepen iznad

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Poredjenje novoda pomocu isEqualNode
      //console.log(curEl, newEl.isEqualNode(curEl)); //Poredi sadrzaj newEl i curEl

      //Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== ""
      ) {
        //Selektujem child, jer sadrzi text
        //console.log("😊", newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //Promena atributa kad je novi element drugaciji od starog(ili trenutno)
      //Updated changed ATTRIBUTES
      //Zamenjujem sve atribute u trenutnom elementu sa atributima u novom elementu
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  //Ova metoda je dostupna na svim viewsima, sve dok oni imaju parentElement property
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    //U fajlu css imam sve za spinner i ako mi nekad zatreba samo to mogu da uzmem i da kopiram
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}_icon-loader"></use>
              </svg>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Metoda za prikaz gresaka na ekranu korisnika
  renderError(message = this._errorMessage) {
    //Kao parametar stavio sam default poruku za gresku, zato mi stoji message = this._errorMessage
    const markup = `
      <div class="error">
      <div>
      <svg>
      <use href="${icons}_icon-alert-triangle"></use>
      </svg>
      </div>
      <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Uspesna poruka
  renderMessage(message = this._message) {
    //Kao parametar stavio sam default poruku za gresku, zato mi stoji message = this._errorMessage
    const markup = `
      <div class="message">
      <div>
      <svg>
      <use href="${icons}_icon-smile"></use>
      </svg>
      </div>
      <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
