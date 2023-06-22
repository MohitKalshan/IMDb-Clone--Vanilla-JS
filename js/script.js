"use strict";

const searchKeyword = document.getElementById("search");
const suggestionsContainer = document.getElementById("card-container");
const searchList = document.getElementById('search-list');

let suggestionList = [];
let FavMovieArray = [];
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
  localStorage.setItem("fetchedMovies" , JSON.stringify(results))

  console.log("Results: ", results);
  suggestionList =results;
  displayMovieList(results);
}

const handleAddFavMovie = () =>{
  console.log("hihiih")

}

// Display search movies list
function displayMovieList(movies) {
  movies.map((item) => {
    let movieListItem = document.createElement("div");
    movieListItem.classList.add("search-list-item");
    movieListItem.innerHTML = `
      <div class="search-item-container">
        <a href="MovieInfo.html?i=${item.imdbID}">
          <div class = "search-item">
            <img src="${(item.Poster != "N/A") ? item.Poster : "../image/not-found.png"}">
            <div class="">
              <h4>${item.Title}</h4>
              ${item.Year}
            </div>
          </div>
        </a>
        <button class="btn btn-info add-btn" onclick={handleAddFavMovie} data-imdbid="${item.imdbID}" type="submit">Add</button>
      </div>
    `;
    suggestionsContainer.appendChild(movieListItem);

    // Add click event listener to "Add" button
    let addBtn = movieListItem.querySelector(".add-btn");
    addBtn.addEventListener("click", function (event) {
    
      event.preventDefault();
      let imdbID = event.target.dataset.imdbid;

      console.log(imdbID,'id')
      const selectedMovie = movies.filter((x)=>x.imdbID === imdbID)
      console.log(selectedMovie,'selected')
      localStorage.setItem("FavouriteMovies", JSON.stringify(selectedMovie));
      window.location.href = "FavMovie.html";
    });
    FavMovieArray.push(item.imdbID);
  });
}
