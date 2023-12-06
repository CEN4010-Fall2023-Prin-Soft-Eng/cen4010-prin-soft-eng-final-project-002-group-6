// Include your API-related functions for upcoming movies
async function fetchUpcomingMovies() {
    const apiEndpoint = `https://moviesdatabase.p.rapidapi.com/titles/x/upcoming`;
    const apiKey = '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe';  
    const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    };

    try {
        const response = await fetch(apiEndpoint, { headers });
        const data = await response.json();
        console.log('API Data:', data); 
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function formatDate(date) {
    return `${date.month}/${date.day}/${date.year}`;
}

function createMovieElement(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('col-md-4', 'movie-container');

    if (movie.primaryImage) {
        const image = document.createElement('img');
        image.src = movie.primaryImage.url || 'default-image.jpg'; // Replace with a default image URL
        image.classList.add('img-fluid', 'movie-image');
        movieDiv.appendChild(image);
    } else {
        // Handle the case when there is no primary image
        console.warn('Movie entry has no primary image:', movie);
        return null; // Skip this movie entry
    }

    const title = document.createElement('div');
    title.innerText = movie.titleText?.text || 'Unknown Title'; // Replace with a default title
    title.classList.add('movie-title');
    movieDiv.appendChild(title);

    const releaseDate = document.createElement('div');
    releaseDate.innerText = `Release Date: ${formatDate(movie.releaseDate)}`; // Include "Release Date: "
    releaseDate.classList.add('release-date');
    movieDiv.appendChild(releaseDate);

    return movieDiv;
}

function displayMovies(movies) {
    console.log('Display movies called'); 
    const moviesContainer = document.querySelector('#movies-container');

    let displayedMoviesCount = 0; // Initialize a counter for displayed movies

    movies.forEach((movie, index) => {
        const movieElement = createMovieElement(movie);
        if (movieElement) {
            if (displayedMoviesCount % 3 === 0) {
                // Start a new row for every 3 displayed movies
                const newRow = document.createElement('div');
                newRow.classList.add('row');
                moviesContainer.appendChild(newRow);
            }

            // Append the movie element to the current row
            const currentRow = moviesContainer.lastElementChild;
            currentRow.appendChild(movieElement);

            displayedMoviesCount++; // Increment the counter for displayed movies
        }
    });
}



// Add an event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Your initialization code specific to the upcoming movies page

    // Call API function for fetching upcoming movies
    fetchUpcomingMovies();
});
