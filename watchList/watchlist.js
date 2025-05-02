const watchlistSection = document.getElementById('watchlist-section');

function renderWatchlist() {
  const storedList = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (storedList.length === 0) {
    watchlistSection.innerHTML = "<p>Your watchlist is empty.</p>";
    return;
  }

  storedList.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.innerHTML = `
      <img class="movie-img" src="${movie.Poster !== 'N/A' ? movie.Poster : ''}" alt="${movie.Title}" >
        <div class="movie-info">
            <div class="movie-header">
                <h3 class="movie-title">${movie.Title} (${movie.Year})</h3>
                <p class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.imdbRating ? movie.imdbRating: '6.7'}</p>
            </div>
            <div class="movie-details">
                <P>${movie.Runtime ? movie.Runtime : '117 min'}</p>
                <p class="movie-genre">Genre: ${movie.Type ? movie.Type : 'Action, Drama, Sci-fi'}</p>
                <div class='btn'>
                    <button data-id="${movie.imdbID}" onclick='${removeFromWatchlist()}'><i class="fa-solid fa-circle-minus"></i>Remove</button> 
                    
                </div>
            </div>
             <p class="movie-plot">${movie.plot ? movie.plot : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dignissimos repudiandae assumenda, numquam perferendis explicabo quae.'}</p>
        </div>
    `;
    movieEl.classList.add('movie-card');        
    watchlistSection.appendChild(movieEl);
  });
}

renderWatchlist();
