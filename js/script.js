"use strict";

const searchKeyword = document.getElementById("search");
const suggestionsContainer = document.getElementById("card-container");
const searchList = document.getElementById('search-list');

let suggestionList = [];
// Event listner on search
searchKeyword.addEventListener("keyup", function () {
  let searchTerm = searchKeyword.value.trim();
  if (searchTerm.length < 2) {
    return;
  } else {
    fetchMovies(searchTerm);
  }
});

// Fetches data from api and calls function to add it in
async function fetchMovies(searchTerm) {
  const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=e8e9899f`;
  console.log(url);
  const response = await fetch(`${url}`);
  const data = await response.json();
  const results = data.Search;
  // console.log("Results: ", results);
  suggestionList =results;
  displayMovieList(results);
}

// Display search movies list
function displayMovieList(movies) {
  // console.log("displayMovie: ", movies);
  movies.map((item) => {
    let movieListItem = document.createElement("div");
    movieListItem.classList.add("search-list-item");
    movieListItem.innerHTML = `
      <div class="search-item-container">
        <a href="MovieInfo.html?i=${item.imdbID}"> 
          <div class = "search-item">
            <img src = "${(item.Poster != "N/A") ? item.Poster : "../image/not-found.png"}">
            <div clas="">
            <h4>${item.Title}</h4>
            ${item.Year}</div>
          </div>
          </a>
          <a href="FavMovie.html?i=${item.imdbID}"> 
          <button class="btn btn-info" type="submit"">Add</button>
          </a>
      </div>
        `;
    suggestionsContainer.appendChild(movieListItem);
  });
}

