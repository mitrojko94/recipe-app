import View from "./view";
import previewView from "./previewView";
//Ekstraktujem klasu odmah, licno nju, jer necu kreirati nikakvu instancu ovde
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query! Please try again!";
  _message = "";

  _generateMarkup() {
    console.log(this._data); //Ovo mora biti isto kao i model.state.search.results
    return this._data.map(result => previewView.render(result, false)).join("");
  }
}

export default new ResultsView();
