
//moviesdatabase

//moviesminidatabase
async function searchByRatings() {
    console.log("searchByRatings Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/order/byRating/`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        // Process the results
        // Uses  <div class="resultsContainer"></div> in search.html
        const resultsContainer = document.querySelector('.resultsContainer'); 

        // Clear previous results
        resultsContainer.innerHTML = ''; 

        if (data.results && data.results.length > 0) {

            // Storing All API Data Given
            data.results.forEach(movie => {
                const movieID = movie.imdb_id;
                const movieTitle = movie.title;
                const movieRating = movie.rating;
                
                // Create HTML elements to display the movie information
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `<p>Title: ${movieTitle}, Rating: ${movieRating}</p>`;

                // Append the movie information to the container
                resultsContainer.appendChild(movieElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
document.querySelector('#rating-search-bar + button').addEventListener('click', searchByRatings);

async function searchByGenre() {
    console.log("searchByGenre Called");
    // Gets the Genre Currently Selected in the Drop-Down Menu
    const selectedGenre = document.getElementById('genre-dropdown').value;

    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/byGen/${selectedGenre}/`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        // Process the results
        // Uses  <div class="resultsContainer"></div> in search.html
        const resultsContainer = document.querySelector('.resultsContainer'); 

        // Clear previous results
        resultsContainer.innerHTML = ''; 

        if (data.results && data.results.length > 0) {

            // Storing All API Data Given
            data.results.forEach(movie => {
                const movieID = movie.imdb_id;
                const movieTitle = movie.title;

                // Create HTML elements to display the movie information
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `<p>Title: ${movieTitle}, Movie ID: ${movieID},</p>`;

                // Append the movie information to the container
                resultsContainer.appendChild(movieElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
document.querySelector('#genre-dropdown + button').addEventListener('click', searchByGenre);

async function searchByActor() {
    console.log("searchByActor Called");
    // Gets the Genre Currently Selected in the Drop-Down Menu
    const searchActorName = document.getElementById('actor-search-bar').value;

    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/actor/imdb_id_byName/${searchActorName}/`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

                    // Process the results
            // Uses  <div class="resultsContainer"></div> in search.html
            const resultsContainer = document.querySelector('.resultsContainer'); 

            // Clear previous results
            resultsContainer.innerHTML = ''; 

            if(data.results && data.results.length == 1)
            {
                const actorIMDbID = data.results && data.results.length > 0 ? data.results[0].imdb_id : null;
                //resultsContainer.innerHTML = `<p>Actor ID: ${actorIMDbID}</p>`;
                searchByActorID(actorIMDbID);
            }
            else if(data.results && data.results.length > 1) {
                
                // Storing All API Data Given
                data.results.forEach(actor => {
                    const actorID = actor.imdb_id;
                    const actorName = actor.name;

                    // Create HTML elements to display the movie information
                    const actorElement = document.createElement('div');
                    actorElement.innerHTML = `<p>Actor Name: ${actorName}, Actor ID: ${actorID}</p>`;

                    // Append the movie information to the container
                    resultsContainer.appendChild(actorElement);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
document.querySelector('#actor-search-bar + button').addEventListener('click', searchByActor);

// getRolesByActorID
async function searchByActorID(actorIMDbID) {
    console.log("searchByActorID Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorIMDbID}/movies_knownFor/`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        // Process the results
        // Uses  <div class="resultsContainer"></div> in search.html
        const resultsContainer = document.querySelector('.resultsContainer'); 

        // Clear previous results
        resultsContainer.innerHTML = ''; 

        if (data.results && data.results.length > 0) {

            // Storing 1st set of API Data Given
            data.results.forEach(entry => {
                const movie = entry[0];
                const movieID = movie.imdb_id;
                const movieTitle = movie.title;
                const movieRating = movie.rating;

                // Create HTML elements to display the movie information
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `<p>Title: ${movie.title}, IMDb ID: ${movie.imdb_id} </p>`;

                // Append the movie information to the container
                resultsContainer.appendChild(movieElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// ----------------------------------------------------------------------------------
// Testing Purposes
// Actor Name: Matt Damon, Actor ID: nm0000354
// Pulp Fiction: tt0110912
// Oppenheimer: tt15398776

// Overhauling Functions...
// Need to group a lot of information together for a better "Listed Results Here" display

// API NOT WORKING LIST (Not my end)
// MoviesDatabase
// /titles/{id}/crew 

// MoviesMiniDatabase (Does not have information on new releases...)
// Get listgetUpcomingMovies
// GET listgetCastByMovieIds
//

// ----------------------------------------------------------------------------------

// Get Movie Details 
// Returns an Object containing Information Info from Moviesdatabase
async function movieInfo1(movieimdb_id) {
    console.log("MovieInfo1 Called");
    const apiEndpoint = `https://moviesdatabase.p.rapidapi.com/titles/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    };
    try {
        const response = await fetch(apiEndpoint, { headers });
        if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        const movieInfo = {
            title: data.results.titleText.text,
            image_url: data.results.primaryImage.url,
            image_ID: data.results.primaryImage.id,
            release: data.results.releaseYear.year,
            releaseDay: data.results.releaseDate.day,
            releaseMonth: data.results.releaseDate.month,
            releaseYear: data.results.releaseDate.year,
        };
        return movieInfo;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Returns an Object containing Information from Moviesminidatabase
async function movieInfo2(movieimdb_id) {
    console.log("MovieInfo2 Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });

        if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        const movieInfo = {
            imdb_id: data.results.imdb_id,
            title: data.results.title,
            year: data.results.year,
            popularity: data.results.popularity,
            content_rating: data.results.content_rating,
            movie_length: data.results.movie_length,
            rating: data.results.rating,
            trailer: data.results.trailer,
            image_url: data.results.image_url,
            release: data.results.release,
            plot: data.results.plot,
        };

        return movieInfo;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Displays Movie Info at the Bottom of search.html
function displayMovieInfo(movieInfo) {
    console.log("displayMovieInfo Called");
    const resultsContainer = document.getElementById('resultsContainer');
    const movieInfoDiv = document.createElement('div');
    movieInfoDiv.classList.add('card', 'mt-3');
    movieInfoDiv.innerHTML = `
        <div class="card-body">
            <h2 class="card-title">${movieInfo.title} (${movieInfo.year})</h2>
            <p class="card-text">IMDb ID: ${movieInfo.imdb_id}</p>
            <p class="card-text">Rating: ${movieInfo.rating}</p>
            <p class="card-text">Content Rating: ${movieInfo.content_rating}</p>
            <p class="card-text">Plot: ${movieInfo.plot}</p>
            <!-- Add more fields as needed -->

            <img src="${movieInfo.image_url}" alt="${movieInfo.title} Poster" class="img-fluid mb-3">

            <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="${movieInfo.trailer}" title="${movieInfo.title} Trailer"></iframe>
            </div>
        </div>
    `;
    resultsContainer.appendChild(movieInfoDiv);
}

async function tsearchByRatings() {
    console.log("tsearchByRatings Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/order/byRating/`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        // Process the results
        // Uses  <div class="resultsContainer"></div> in search.html
        const resultsContainer = document.querySelector('.resultsContainer'); 
        // Clear previous results
        resultsContainer.innerHTML = ''; 

        if (data.results && data.results.length > 0) {


            data.results.forEach(movie => {
                const movieimdb_id = movie.imdb_id;
                const movieInfo = movieInfo2(movieimdb_id);
                displayMovieInfo(movieInfo);
            });

        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


