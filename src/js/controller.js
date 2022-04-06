import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    //LISTENING FOR LOAD AND HASHCHANGE EVENTS - nastavna lekcija
    const id = window.location.hash.slice(1); //Ovako dobijam koji mi je hash u url adresi

    if (!id) return;
    recipeView.renderSpinner(); //Stavio sam da je parentEl recipeContainer, jer je to onaj element koji sadrzi celu pozadinu

    //Azuriranje podataka koji su selektovani - Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //LOADING A RECIPE FROM API - nastavna lekcija
    await model.loadRecipe(id); //Stavio sam await, jer je ovo Promise, vraca Promise. Ne vraca nikakvu vrednost, pa je zato nisam stavio u varijablu

    //RENDERINT THE RECIPE - nastavna lekcija
    //Koristim recipe, koje je nasa varijabla koja sadrzi podatke i image, jer to polje sadrzi sliku. Tako radim i sa ostalim poljima

    recipeView.render(model.state.recipe);

    //Bookmark update
    //debugger;
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //console.log(resultsView);
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //searchView.clearInput();

    //Load search results
    await model.loadSearchResults(query); //Ne vraca nista, zato nisam stavio u varijablu, vec samo manipulise sa state

    //Render results
    //console.log(model.state.search.results); //Mora model, jer se nalazi u tom fajlu
    //resultsView.render(model.state.search.results);

    //Dodavanje f-je za stranice
    resultsView.render(model.getSearchResultsPage()); //Kad ne stavim nista, podrazumeva se da je 1

    //Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

//Kontroler koji se izvrsava kad kliknem na dugmad za menjanje stranica
const controlPagination = function (goToPage) {
  //console.log(goToPage);
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

//Kontroler za kontrolu servisa, povecava, smanjuje - mogu da se zovu jos i handlers, jer to i jesu, oni se pokrecu kad se neki dogadjaj desi
const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe view
  //recipeView.render(model.state.recipe);

  //Algoritam za azuriranje podataka, sabiranje, oduzimanje hrane
  recipeView.update(model.state.recipe); //Update text i atributa u DOMU, ne celu stranicu
};

//Controller za dodavanje bookmark
const controlAddBookmark = function () {
  //1. Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  //Controller za brisanje bookmark
  else model.deleteBookmark(model.state.recipe.id);
  //console.log(model.state.recipe);

  //2. Update recipe view
  recipeView.update(model.state.recipe);

  //3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  //console.log(newRecipe);

  try {
    //Show loading spinner
    addRecipeView.renderSpinner();

    //Upload the new recipe data
    await model.uploadRecipe(newRecipe); //Stavio sam await, jer je uploadRecipe async f-ja
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks); //Koristim render, jer hocu da ubacim novi element

    //Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`); //Prvi parametar je nebitan, drugi je title, isto nije bitan, treci je url, koji je jako bitan
    //window.history.back(); //Vraca na prethodnu stranicu

    //Close form window
    setTimeout(function () {
      //Moram da zakomentarisem kod u liniji 135 ako hocu da vidim ucitavanje kad dodajem svoj recipe
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000); //Mnozim sa 1000, da bih dobio milisekunde
  } catch (err) {
    console.error("🤦‍♀️😊", err);
    addRecipeView.renderError(err.message);
  }
};

//LISTENING FOR LOAD AND HASHCHANGE EVENTS - nastavna lekcija
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

//Linija koda 175-177 je ista kao i linija koda 180-181, samo drugacije napisano
//window.addEventListener("hashchange", controlRecipes);
//window.addEventListener("load", controlRecipes); //Ovaj dogadjaj se desava kad se kompletna stranica ucita
