class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    //Pozvao sam opet selektor search__field, to se odnosi na polje za trazenje i uzeo sam njegovu vrednost, zato je value
    //Sacuvao sam vrednost inputa u neku varijablu, jer posle toga ide odmah da se izbrise ta ukucana vrednost, pa da se vrati query(bice prazan input)
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query;

    //Drugi nacin je da ovo ostane ovako, a da u fajlu controller.js dodam u try bloku searchView.clearInput()
    //return this._parentEl.querySelector(".search__field").value;
  }

  _clearInput() {
    return (this._parentEl.querySelector(".search__field").value = "");
  }

  //Dodavanje event listenera
  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      //Kad god imam formu, moram da imam event.preventDefault(), inace ce stranica da se azurira stalno
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView(); //Uvek ekstraktujem novu klasu koja se zove isto kao i nasa klasa, samo sa velikim slovima. To je instanca nase klase
