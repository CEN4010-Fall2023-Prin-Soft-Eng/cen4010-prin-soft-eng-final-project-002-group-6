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
// Get All Movie Info |  Returns a object that contains various movie information for the given movie's IMDB ID
async function getMovieInfo(movieimdb_id) {
    console.log("getMovieInfo Called");
    console.log("ID: " + movieimdb_id);
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        const genresArray = data.results.gen;
        const genreNames = genresArray.map(genre => genre.genre);
        const genresString = genreNames.join(', ');

        const movieInfo = {
            title: data.results.title,
            contentRating: data.results.content_rating,
            year: data.results.year,
            genre: genresString,
            rating: data.results.rating,
            plot: data.results.plot,
            image: data.results.image_url,
            trailer: data.results.trailer
        };

        return movieInfo;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Displays Movie Information at the bottom of the HTML Page, MUST have this at bottom of page: " <section id="moviesContainer">   </section> "
function displayMovieInfo(movieInfo) {
    console.log("displayMovieInfo Called");
    console.log(movieInfo);
        // Check if a section with the same movie ID already exists
    if (document.getElementById(movieInfo.imdb_id)) {
        console.log(`Movie with ID ${movieInfo.imdb_id} already displayed.`);
        return;
    }
    // Get the container element
    const container = document.getElementById('moviesContainer');
    
    // Create a new section element
    const section = document.createElement('section');
    section.classList.add('p-4');

    // Create the HTML structure dynamically based on movieInfo
    section.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-6 d-flex justify-content-center">
                            <img src="${movieInfo.image}" class="img-fluid">
                        </div>
                        <div class="col-md-6">
                            <div class="row mb-1 text-center">
                                <h2 style="font-size: 36px;">${movieInfo.title}</h2>
                            </div>
                            <div class="row mb-2">
                                <span style="font-size: 16px;">Rated: ${movieInfo.contentRating}</span>
                            </div>
                            <div class="row mb-2">
                                <span style="font-size: 16px;">Rating: ${movieInfo.rating}</span>
                            </div>
                            <div class="row mb-2">
                                <span style="font-size: 16px;">Release Year: ${movieInfo.year}</span>
                            </div>
                            <div class="row mb-4">
                                <span style="font-size: 16px;">Plot: "${movieInfo.plot}"</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    `;
    // Append the section to the container
    container.appendChild(section);
}


// Search For Movies by their rating. 
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

        const container = document.getElementById('moviesContainer');
        container.innerHTML = '';
        
        const limit=50;
        const counter=0;

        if(counter>= limit){
            return data;
        }
        else{
            if (data.results && data.results.length > 0) {
                // Use Promise.all to fetch movie information in parallel
                const moviePromises = data.results.map(movie => getMovieInfo(movie.imdb_id));
                const movieInfos = await Promise.all(moviePromises);
    
                // Display movie information
                movieInfos.forEach(movieInfo => {
                    displayMovieInfo(movieInfo);
                });
            } else {
                console.log('No results found.');
            }
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

        const container = document.getElementById('moviesContainer');
        container.innerHTML = '';

        const limit=50;
        const counter=0;

        if(counter>= limit){
            return data;
        }
        else{
            if (data.results && data.results.length > 0) {
                // Use Promise.all to fetch movie information in parallel
                const moviePromises = data.results.map(movie => getMovieInfo(movie.imdb_id));
                const movieInfos = await Promise.all(moviePromises);
    
                // Display movie information
                movieInfos.forEach(movieInfo => {
                    displayMovieInfo(movieInfo);
                });
            } else {
                console.log('No results found.');
            }
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

        const container = document.getElementById('moviesContainer');
        container.innerHTML = '';

            if(data.results && data.results.length > 0) {
                const actorIMDbID = data.results[0].imdb_id
                console.log("Actor Movie ID: " + actorIMDbID);
                searchByActorID1(actorIMDbID);
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
async function searchByActorID1(actorIMDbID) {
    console.log("searchByActorID Called");
    console.log("Actor Movie ID: " + actorIMDbID);
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorIMDbID}/movies_knownFor/`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();
    
        console.log("JSON FILE: " + data);
        console.log("JSON FILE:", JSON.stringify(data, null, 2));
    
        const container = document.getElementById('moviesContainer');
        container.innerHTML = '';
    
        const limit = 50;
        let counter = 0;
    
        if (counter >= limit) {
            // Remove this line if you want the function to continue execution
            // return data;
        } else {
            if (data.results && data.results.length > 0) {
                const moviePromises = data.results.map(async movieDetailsArray => {
                    const movie = movieDetailsArray[0];
                    return getMovieInfo(movie.imdb_id);
                });
    
                const movieInfos = await Promise.all(moviePromises);
    
                // Display movie information
                movieInfos.forEach(movieInfo => {
                    displayMovieInfo(movieInfo);
                    counter++;
                });
            } else {
                console.log('No results found.');
            }
        }
        // Remove this line if you want the function to continue execution
        // return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// The Hard Way reeeeeeeeeeeeeeeeeeeeeeeeeeee
// Test Function 
// Tests the get function for various movie related data
// Displays Movie information at the contain with class "resultsContainer" 
// Uses imdb id (tt0110912), Pulp Fiction, as the test case

async function Tester(){
    const movieID = 'tt0110912';

    const resultsContainer = document.querySelector('.resultsContainer'); 
    // Clear previous results
    resultsContainer.innerHTML = ''; 

        if (getMovieTitle(movieID) != null) {
            const title = await getMovieTitle(movieID);
            const contentRating = await getMovieContentRating(movieID);
            const year = await getMovieYear(movieID);
            const genre = await getMovieGenre(movieID);
            const rating = await getMovieRating(movieID);
            const plot = await getMoviePlot(movieID);
            const image = await getMovieImage(movieID);
            // Create HTML elements to display the movie information
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `
            <div class="row"> 
                <div class="col">
                    <img src=${image} class="img-fluid">
                </div>
                <div class="col">
                    <div class="row"> Title: ${title} </div>
                    <div class="row"> Rated: ${contentRating} </div>
                    <div class="row"> Genre: ${genre} </div>
                    <div class="row"> Year: ${year} </div>
                    <div class="row"> Rating: ${rating} </div>
                    <div class="row"> Plot: ${plot} </div>                   
                </div>
            </div>
            `;
            // Append the movie information to the container
            resultsContainer.appendChild(movieElement);

        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
}

// Display Movie
async function displayMovie(){
    const movieID = 'tt0110912';

    const resultsContainer = document.querySelector('.resultsContainer'); 
    // Clear previous results
    resultsContainer.innerHTML = ''; 

        if (getMovieTitle(movieID) != null) {
            const title = await getMovieTitle(movieID);
            const contentRating = await getMovieContentRating(movieID);
            const year = await getMovieYear(movieID);
            const genre = await getMovieGenre(movieID);
            const rating = await getMovieRating(movieID);
            const plot = await getMoviePlot(movieID);
            const image = await getMovieImage(movieID);

            // Create HTML elements to display the movie information
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `

            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-6 d-flex justify-content-center">
                            <img src=${image} class="img-fluid">                        
                        </div>
                        <div class="col-md-6">
                            <div class="row mb-1 text-center"> 
                                <h2 style="font-size: 36px;">${title}</h2> 
                            </div>
                            <div class="row mb-2"> 
                                <span style="font-size: 16px;">Rated: ${contentRating}</span> 
                            </div>
                            <div class="row mb-2"> 
                                <span style="font-size: 16px;">Genre: ${genre}</span> 
                            </div>
                            <div class="row mb-2"> 
                                <span style="font-size: 16px;">Rating: ${rating}</span> 
                            </div>
                            <div class="row mb-2"> 
                                <span style="font-size: 16px;">Release Year: ${year}</span>
                            </div>
                            <div class="row mb-4">
                                <span style="font-size: 16px;">Plot: ${plot}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>

            `;
            // Append the movie information to the container
            resultsContainer.appendChild(movieElement);

        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
}

// Get Title | Returns a string of Title for the given movie's IMDB ID
async function getMovieTitle(movieimdb_id) {
    console.log("getMovieTitle Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        return data.results.title;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Get Image URL| Returns a string of the Image for the given movie's IMDB ID
async function getMovieImage(movieimdb_id) {
    console.log("getMovieImage Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        return data.results.image_url;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Get Trailer URL | Returns a string of the Trailer for the given movie's IMDB ID
async function getMovieTrailer(movieimdb_id) {
    console.log("getMovieTrailer Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        return data.results.trailer;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Get Content Rating | Returns a string of the Conent Rating for the given movie's IMDB ID
async function getMovieContentRating(movieimdb_id) {
    console.log("getMovieContentRating Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        return data.results.content_rating;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Get Year | Returns a string of the release year for the given movie's IMDB ID
async function getMovieYear(movieimdb_id) {
    console.log("getMovieYear Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        return data.results.year;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Get Rating | Returns a string of the plot for the given movie's IMDB ID
async function getMovieRating(movieimdb_id) {
    console.log("getMovieRating Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        return data.results.rating;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Get Plot | Returns a string of the plot for the given movie's IMDB ID
async function getMoviePlot(movieimdb_id) {
    console.log("getMoviePlot Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        return data.results.plot;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Get Genre(s) | Returns a string of genres for the given movie's IMDB ID
async function getMovieGenre(movieimdb_id) {
    console.log("getMovieGenre Called");
    const apiEndpoint = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieimdb_id}`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    };
  
    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();

        const genresArray = data.results.gen;
        const genreNames = genresArray.map(genre => genre.genre);
        const genresString = genreNames.join(', ');

        return genresString;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}



