const favMoviesContainer = document.getElementById("fav-movies-container");
const showFavourites = document.getElementById("favorites-section");
const emptyFavText = document.getElementById("empty-fav-text");

console.log("a", window.location);
const pageHref = window.location.search;
// Construct a new object and pass the page href to URLSearchParams
const searchParams = new URLSearchParams(pageHref);
const movieID = searchParams.get("i");
console.log("i = ", movieID);

addToFavDOM();
showEmptyText();

let favMovieArray = [];

function showEmptyText() {
  if (favMoviesContainer.innerHTML == "") {
    emptyFavText.style.display = "block";
  } else {
    emptyFavText.style.display = "none";
  }
}
  
 // Fetches data from api and calls function to add it in
 async function fetchMoviesByID() {
  const url = `https://www.omdbapi.com/?apikey=e8e9899f&i=${movieID}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
    return data;
}


// Add to favourite of localStorage
async function handleFavBtn(e) {
  const target = e.target;
  console.log(target);
  let data = await fetchMoviesByID(target);
  console.log(data)
  let favMoviesLocal = localStorage.getItem("favMoviesList");

  if (favMoviesLocal) {
    favMovieArray = Array.from(JSON.parse(favMoviesLocal));
  } else {
    localStorage.setItem("favMoviesList", JSON.stringify(data));
  }

  // to check if movie is already present in the fav list
  let isPresent = false;
  favMovieArray.forEach((movie) => {
    if (data.Title == movie.Title) {
      notify("already added to fav list");
      isPresent = true;
    }
  });

  if (!isPresent) {
    favMovieArray.push(data);
  }

  localStorage.setItem("favMoviesList", JSON.stringify(favMovieArray));
  isPresent = !isPresent;
  addToFavDOM();
}

// Add to favourite list DOM
function addToFavDOM() {
  favMoviesContainer.innerHTML = "";

  let favList = JSON.parse(localStorage.getItem("favMoviesList"));
  if (favList) {
    favList.forEach((movie) => {
      const div = document.createElement("div");

      div.innerHTML = ` 
    <img
      src="${movie.Poster}"
      alt=""
      class="fav-movie-poster"
    />
    <div class="movie-card-details">
      <p class="movie-name mt-3 mb-0">
       <a href = "./MovieInfo/MovieInfo.html" class="fav-movie-name" data-id="${movie.Title}">${movie.Title}<a> 
      </p>
      <small class="text-muted">${movie.Year}</small>
    </div>
    <div class="delete-btn my-4">
        <i class="fa-solid fa-trash-can" data-id="${movie.Title}"></i>
    </div>
    `;
      favMoviesContainer.prepend(div);
    });
  }
}

// To notify
function notify(text) {
  window.alert(text);
}

// Delete from favourite list
function deleteMovie(name) {
  let favList = JSON.parse(localStorage.getItem("favMoviesList"));
  let updatedList = Array.from(favList).filter((movie) => {
    return movie.Title != name;
  });

  localStorage.setItem("favMoviesList", JSON.stringify(updatedList));

  addToFavDOM();
  showEmptyText();
}

// Handles click events
async function handleClickListner(e) {
  const target = e.target;

  if (target.classList.contains("add-fav")) {
    e.preventDefault();
    handleFavBtn(e);
  } else if (target.classList.contains("fa-trash-can")) {
    deleteMovie(target.dataset.id);
  } else if (target.classList.contains("fa-bars")) {
    if (showFavourites.style.display == "flex") {
      document.getElementById("show-favourites").style.color = "#8b9595";
      showFavourites.style.display = "none";
    } else {
      showFavourites.classList.add("animate__backInRight");
      document.getElementById("show-favourites").style.color =
        "var(--logo-color)";
      showFavourites.style.display = "flex";
    }
  }

  localStorage.setItem("movieName", target.dataset.id);
  // Event listner on whole document
  document.addEventListener("click", handleClickListner);
}

