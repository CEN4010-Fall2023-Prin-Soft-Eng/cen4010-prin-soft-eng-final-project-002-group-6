document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('start-btn');
    const questionContainer = document.getElementById('question-container');
    const choicesContainer = document.getElementById('choices-container');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const movieResults = document.getElementById('movie-results');

    const quizData = [
        {
            question: 'How would you rather spend your evening?',
            choices: ['Spend quality time with my family', 'Annoy my significant other', 'Think of a funny joke', 'Climb a mountain'],
            genres: ['Family', 'Drama', 'Comedy', 'Action']
        }
        // Add more quiz data as needed
    ];

    let currentQuestionIndex = 0;

    startBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        startBtn.classList.add('hidden');
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        document.getElementById('question-text').innerText = currentQuestion.question;

        choicesContainer.innerHTML = '';
        currentQuestion.choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('button');
            choiceBtn.classList.add('choice-btn');
            choiceBtn.innerText = choice;
            choiceBtn.addEventListener('click', () => selectChoice(index));
            choicesContainer.appendChild(choiceBtn);
        });

        questionContainer.classList.remove('hidden');
    }

    function selectChoice(choiceIndex) {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        const selectedGenre = quizData[currentQuestionIndex].genres[choiceIndex];
        resultMessage.innerText = `Based on your selections, it seems that you prefer ${selectedGenre} movies. Here are some movies we think you may like!`;

        // Call the function to fetch movies based on the selected genre and display them in the movieResults container
        fetchMovies(selectedGenre);
    }

    function fetchMovies(selectedGenre) {
        const apiKey = '38672978a3mshb0e70ee4a14db29p110155jsnb9b1f54aa483';
        const apiUrl = `https://moviesminidatabase.p.rapidapi.com/movie/byGen/${selectedGenre}/`;
    
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(moviesData => {
            // console.log('Movies Data:', moviesData);
            displayMovieResults(moviesData);
        })
        .catch(error => console.error('Error fetching movies:', error));
    }


    function fetchMovieDetails(imdbId, movieElement) {
        const apiKey = '38672978a3mshb0e70ee4a14db29p110155jsnb9b1f54aa483';
        const apiUrl = `https://moviesminidatabase.p.rapidapi.com/movie/id/${imdbId}/`;
    
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(movieDetails => {
            // Display the detailed information in the movie element
            if (movieDetails && movieDetails.results) {
                const detailsHTML = `
                    <p>Year: ${movieDetails.results.year}</p>
                    <p>Rating: ${movieDetails.results.rating}</p>
                    <p>Plot: ${movieDetails.results.plot}</p>
                    <!-- Add more details as needed -->
                `;
                // Create an img element for the movie poster
            const posterImg = document.createElement('img');
            posterImg.src = movieDetails.results.image_url;
            posterImg.alt = `${movieDetails.results.title} Poster`;

            // Append the details and poster to the movieElement
            movieElement.innerHTML += detailsHTML;
            movieElement.appendChild(posterImg);
            } else {
                console.warn('No details found or invalid data:', movieDetails);
            }
        })
        .catch(error => console.error('Error fetching movie details:', error));
    }
    
    function displayMovieResults(moviesData) {
        console.log('Movies Data received:', moviesData);
    
        const movieResultsContainer = document.getElementById('movie-results');
        movieResultsContainer.innerHTML = ''; // Clear previous results
    
        if (moviesData && moviesData.results && Array.isArray(moviesData.results)) {
            moviesData.results.forEach((movie) => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `<h3>${movie.title}</h3><p>${movie.description}</p>`;
    
                // Make a new API call to get detailed information based on IMDb ID
                fetchMovieDetails(movie.imdb_id, movieElement);
    
                movieResultsContainer.appendChild(movieElement);
            });
        } else {
            console.warn('No movies found or invalid data:', moviesData);
            movieResultsContainer.innerHTML = 'No movies found for this genre.';
        }
    }
    
    

});
