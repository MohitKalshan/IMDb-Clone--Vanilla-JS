

const favMoviesContainer = document.getElementById("fav-movies-container");
const showFavourites = document.getElementById("favorites-section");
const emptyFavText = document.getElementById("empty-fav-text");

const fetchedData = JSON.parse(localStorage.getItem("fetchedMovies"))
console.log(fetchedData , 'movies')

// console.log("a", window.location);
// const pageHref = window.location.search;

let FavMovieArray = [];

// Retrieve imdbID from local storage
let imdbID = localStorage.getItem("imdbID");
// console.log("i = ", imdbID);
console.log("array = ", FavMovieArray);

// Fetch data for the clicked movie
async function fetchMovieData(imdbID) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=e8e9899f`;
  const response = await fetch(url);
  const data = await response.json();
  FavMovieArray.push(data); 
  // Display the fetched data on the page as required
  const favMovie = JSON.parse(localStorage.getItem('FavouriteMovies'));
  console.log(favMovie,'favvvvvvvvs')
}
fetchMovieData(imdbID);

