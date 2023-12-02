//moviesdatabase
//searchByTitle
    async function searchMovies(searchTerm) {
        const apiEndpoint = `https://moviesdatabase.p.rapidapi.com/search/${encodeURIComponent(searchTerm)}`;
        const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
        const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        };
    
        try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();
        return data;
        } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
        }
    }

//moviesminidatabase
  async function searchByRatings() {
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

async function searchByGenre() {
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
            data.results.forEach(movie => {
                const movieID = movie.imdb_id;
                const movieTitle = movie.title;

                // Create HTML elements to display the movie information
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `<p>Title: ${movieTitle}</p>`;

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



// Search By Actor ---> Returns Movies played by that actor
// step 1: Use MoviesMiniDatabase API to find Actor's imdb_id by their name.
// Step 2: Use MoviesMiniDatabase API to find 

async function searchByActor() {
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
                resultsContainer.innerHTML = `<p>Actor ID: ${actorIMDbID}</p>`;
                //Works up to here me sleep now 6:44am zzzzzzzzzzzzzz
            }
            else if(data.results && data.results.length > 1) {



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
async function searchByActorID(actor_id) {
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actor_id}/movies_knownFor/`;
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
                const movieID = movie.imdb_id;
                const movieTitle = movie.title;

                // Create HTML elements to display the movie information
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `<p>Title: ${movieTitle}</p>`;

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
