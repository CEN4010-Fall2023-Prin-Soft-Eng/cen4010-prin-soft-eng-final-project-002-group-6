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
        },
        {
            question: 'What type of adventure are you in the mood for?',
            choices: ['A thrilling journey through unknown realms.', 'A heartwarming story of love and friendship.', 'Solving a complex mystery that keeps you on the edge of your seat.', 'Exploring the depths of space and encountering the unknown.'],
            genres: ['Fantasy', 'Romance', 'Thriller', 'Adventure']
        },
        {
            question: 'Select a mood for your movie night:',
            choices: ['Spooky and tense', 'Futuristic and mind-bending', 'Crime-solving and intense', 'Mysterious and suspenseful'],
            genres: ['Horror', 'Sci-Fi', 'Crime', 'Mystery']
        }
        // Add more quiz data as needed
    ];

    let currentQuestionIndex = 0;
    let selectedGenres = [];

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
            choiceBtn.addEventListener('click', () => selectChoice(index, currentQuestionIndex));
            choicesContainer.appendChild(choiceBtn);
        });

        questionContainer.classList.remove('hidden');
    }

    function selectChoice(choiceIndex, questionIndex) {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        const selectedGenre = quizData[questionIndex].genres[choiceIndex];
        selectedGenres.push(selectedGenre);

        // Increment the currentQuestionIndex to move to the next question
        currentQuestionIndex++;

        // Check if there are more questions
        if (currentQuestionIndex < quizData.length) {
            // If there are more questions, show the next one after a delay
            setTimeout(() => showQuestion(), 2000); // Adjust the timeout as needed
        } else {
            // If there are no more questions, fetch movies based on selected genres
            fetchMovies(selectedGenres);
        }
    }

    function fetchMovies(genres) {
        const apiKey = '38672978a3mshb0e70ee4a14db29p110155jsnb9b1f54aa483';
        
        const requests = genres.map(genre => {
            const apiUrl = `https://moviesminidatabase.p.rapidapi.com/movie/byGen/${genre}/`;

            return fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
                }
            })
            .then(response => response.json())
            .catch(error => console.error(`Error fetching movies for ${genre}:`, error));
        });

        // Wait for all requests to complete
        Promise.all(requests)
            .then(moviesDataArray => {
                // Merge or display results as needed
                const mergedMoviesData = mergeMoviesData(moviesDataArray);
                displayMovieResults(mergedMoviesData, genres);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }

    function mergeMoviesData(moviesDataArray) {
        // Merge or concatenate the results from multiple requests
        return {
            results: moviesDataArray.flatMap(data => data.results || [])
        };
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
                    <p>IMDB Rating: ${movieDetails.results.rating}</p>
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

    function displayMovieResults(moviesData, genres) {
        console.log('Movies Data received:', moviesData);

        const movieResultsContainer = document.getElementById('movie-results');
        movieResultsContainer.innerHTML = ''; // Clear previous results

        const resultMessageText = `Based on your selections, it seems that you prefer ${genres.join(', ')} movies. Here are some movies we think you may like!`;
        resultMessage.innerText = resultMessageText;

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
            movieResultsContainer.innerHTML = 'No movies found for the selected genres.';
        }
    }
});
