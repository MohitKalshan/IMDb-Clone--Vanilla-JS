"use strict";
const title = document.getElementById("movie-title");
const year = document.getElementById("year");
const runtime = document.getElementById("runtime");
const rating = document.getElementById("rating");
const poster = document.getElementById("poster");
const plot = document.getElementById("plot");
const directorsName = document.getElementById("director-names");
const castName = document.getElementById("cast-names");
const genre = document.getElementById("genre");

console.log("a", window.location);
const pageHref = window.location.search;
// console.log("keyvalue", pageHref);

// Construct a new object and pass the page href to URLSearchParams
const searchParams = new URLSearchParams(pageHref);
// console.log("search result", searchParams);
const movieID = searchParams.get("i");
// console.log("i = ", movieID);

async function fetchMoviesByID() {
  const url = `https://www.omdbapi.com/?apikey=e8e9899f&i=${movieID}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  title.innerHTML = data.Title;
  year.innerHTML = data.Year;
  runtime.innerHTML = data.Runtime;
  rating.innerHTML = `${data.imdbRating}/10`;
  poster.setAttribute("src", `${(data.Poster != "N/A") ? data.Poster : "../image/not-found.png"}`);
  plot.innerHTML = data.Plot;
  directorsName.innerHTML = data.Director;
  castName.innerHTML = data.Actors;
  genre.innerHTML = data.Genre;
}
fetchMoviesByID();
