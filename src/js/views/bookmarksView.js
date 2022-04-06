import View from "./view";
import previewView from "./previewView";
//Ekstraktujem klasu odmah, licno nju, jer necu kreirati nikakvu instancu ovde
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    console.log(this._data); //Ovo mora biti isto kao i model.state.search.results
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
