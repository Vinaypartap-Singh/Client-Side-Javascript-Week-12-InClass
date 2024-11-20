// Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

const key = "487b195c"; // API key

// Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value.trim(); // Trim spaces
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=487b195c`; // Correct API key usage

  // If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  } else {
    // Fetch data from API
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Response === "True") {
          // Movie found
          result.innerHTML = `
            <div class="info">
                <img src="${data.Poster}" class="poster" alt="${
            data.Title
          } Poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="star-icon.svg" alt="Rating Star">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
          `;
        } else {
          // Movie not found
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log error for debugging
        result.innerHTML = `<h3 class="msg">An error occurred while fetching the data.</h3>`;
      });
  }
};

// Event Listeners
searchBtn.addEventListener("click", getMovie);
