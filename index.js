// http://www.omdbapi.com/?i=tt3896198&apikey=b25e5304
const apiKey = 'b25e5304';
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');

const watchlistEl = document.getElementById('results-section');

let watchlist = [];

searchButton.addEventListener('click', () => {
    console.log('Button clicked!');
    const query = searchInput.value.trim();
    if (query) {
      searchMovies(query);
    }
});

function searchMovies(query) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&plot=short&tomatoes=true`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.Response === 'True') {
          displayMovies(data.Search);
        } else {
          watchlistEl.innerHTML = `<p>${data.Error}</p>`;
        }
      });
    }

function displayMovies(movies) {
    watchlistEl.innerHTML = ""; 
    movies.forEach(movie => {
      const movieEl = document.createElement('div');
      movieEl.innerHTML = `
        <img class="movie-img" src="${movie.Poster !== 'N/A' ? movie.Poster : ''}" alt="${movie.Title}" width="100">
        <div class="movie-info">
            <div class="movie-header">
                <h3 class="movie-title">${movie.Title} (${movie.Year})</h3>
                <p class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.imdbRating ? movie.imdbRating: '6.7'}</p>
            </div>
            <div class="movie-details">
                <P>${movie.Runtime ? movie.Runtime : '117 min'}</p>
                <p class="movie-genre">Genre: ${movie.Type ? movie.Type : 'Action, Drama, Sci-fi'}</p>
                <div class='btn'>
                    <button data-id="${movie.imdbID}"><i class="fa-solid fa-circle-plus"></i></button> 
                    <span class="add-text">Add to Watchlist</span>
                </div>
            </div>
             <p class="movie-plot">${movie.plot ? movie.plot : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dignissimos repudiandae assumenda, numquam perferendis explicabo quae.'}</p>
        </div>
        
      `;
        movieEl.classList.add('movie-card');
      watchlistEl.appendChild(movieEl);
  
      const addButton = movieEl.querySelector('button');
      addButton.addEventListener('click', () => addToWatchlist(movie));
    });
  }
  
  