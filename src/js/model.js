import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON, sendJSON } from "./helpers.js";
import { AJAX } from "./helpers.js";
import { RES_PER_PAGE, KEY } from "./config.js";

//Stavio sam export, da bih mogao da koristim u controller.js, da uvezem
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [], //Ceo niz koji sadrzi sve trazene podatke(search results)
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

//Funkcija za kreiranje objekta
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    //Dodavanje kljuca samo onima recipe kojima treba
    ...(recipe.key && { key: recipe.key }), //Ako je recipe.key neka vrednost onda ce biti vracen key: recipe.key. U suprtonom, ako je recipe.key nista, ne postoji, nista se nece vratiti
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key="${KEY}"`);
    state.recipe = createRecipeObject(data);

    //Pravim da kad ponovo ucitam imam sacuvan bookmark
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmared = true;
    else state.recipe.bookmared = false;

    console.log(state.recipe);
  } catch (err) {
    //Temp error handling
    console.error(`${err}🤦‍♀️`);
    throw err;
  }
};

//Implementing Search Functionality

//Stavio sam async, jer mi treba neki API i kao parametar sam prosledio query, jer je to neki podatak koji mi trazimo, tipa pizza
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}%?key="${KEY}"`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    //console.log(state.search.results);

    //Restartovao sam stranicu, da kad kucam novo jelo krece od prve stranice
    state.search.page = 1;
  } catch (err) {
    console.error(`${err}🤦‍♀️`);
    throw err;
  }
};
//loadSearchResults("pizza");

//Implementing Pagination
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  //Calculate pages
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  //Pristupam ingredients, jer on sadrzi sve podatke za povecanje, smanjenje. A moram recipe, jer se u njemu nalazi
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;

    //Formula za izracunavanje quantity
    //newQuantity = oldQuantity * newServings / oldServings
    //Primer: 2 * 8 / 4 = 4
  });

  //Azuriram novi servings kodom ispod, linija koda 87
  state.recipe.servings = newServings;
};

//Implementing local storage
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks)); //Prvi parametar proizvoljno ime, drugi parametar koji objekat hocu da pretvorim
};

//Implementing bookmarks
export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmared = true;

  persistBookmarks();
};

//Brisanje bookmarks - za brisanje nam je potreban sam id, a kad dodajemo nesto, ceo podatak nam treba
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmared = false;

  persistBookmarks();
};

//Izvlacenje podataka iz local storage
const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage); //parse pretvara string u objekat
};

init();
//console.log(state.bookmarks);

//Funkcija za debugging
// const clearBookmarks = function () {
//   localStorage.clear("bookmarks");
// };
// clearBookmarks();

//Uploading new Recipe
export const uploadRecipe = async function (newRecipe) {
  try {
    //console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map(ing => {
        const ingArr = ing[1].split(",").map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use the correct format :)"
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      }); //Pretvaram u niz, pomocu entries()
    //console.log(ingredients);
    //Kreiranje objekta za upload
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    //console.log(recipe);

    //Kreiranje AJAX poziva pomocu sendJSON()
    const data = await AJAX(`${API_URL}?key="${KEY}"`, recipe);
    //console.log(data);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
