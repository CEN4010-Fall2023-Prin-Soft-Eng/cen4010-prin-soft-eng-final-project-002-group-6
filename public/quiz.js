// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; // Import the Firestore module

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD26xC-L3bPhSRsGe2vnO62qawCCm5A-yA",
    authDomain: "cinemate-4c026.firebaseapp.com",
    databaseURL: "https://cinemate-4c026-default-rtdb.firebaseio.com",
    projectId: "cinemate-4c026",
    storageBucket: "cinemate-4c026.appspot.com",
    messagingSenderId: "86589565365",
    appId: "1:86589565365:web:fa3da93562a4d3f5ee11fc",
    measurementId: "G-3KJKEDEGJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get Auth instance
const auth = getAuth();

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

    startBtn.addEventListener('click', function () {
        // Check if the user is logged in
        const user = auth.currentUser;

        if (user) {
            // If the user is logged in, start the quiz
            startQuiz();
        } else {
            // If the user is not logged in, redirect to the login page with a message
            const message = "Please log in to take the quiz.";
            redirectToLoginForQuiz(message);
        }
    });

    // Function to redirect to the login page with a message
function redirectToLoginForQuiz(message) {
    // Display a message on the quiz page
    const contentDiv = document.getElementById('content'); // Adjust the ID accordingly
    contentDiv.innerHTML = `<p class="quiz-error-message" style="color: white;">${message}</p>`;

    // Delay the redirection for 1000 milliseconds (1 second)
    setTimeout(() => {
        // Redirect to the quiz page
        window.location.href = 'login.html';
    }, 1000);
}

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
            setTimeout(() => showQuestion(), 400); // Adjust the timeout as needed
        } else {
            // If there are no more questions, fetch movies based on selected genres
            fetchMovies(selectedGenres);
        }
    }

    function fetchMovies(genres) {
        const apiKey = '38672978a3mshb0e70ee4a14db29p110155jsnb9b1f54aa483';
        const maxMoviesToDisplay = 15; // Set desired maximum number of movies
    
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
                displayMovieResults(mergedMoviesData, genres, maxMoviesToDisplay);
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
                // Create an img element for the movie poster
                const posterImg = document.createElement('img');
                posterImg.src = movieDetails.results.image_url;
                posterImg.alt = `${movieDetails.results.title} Poster`;
    
                // Append the poster to the movieElement
                movieElement.appendChild(posterImg);
    
                // Display the other details
                const detailsHTML = `
                    <h3>${movieDetails.results.title}</h3>
                    <p>Rated ${movieDetails.results.content_rating}</p>
                    <p>Year: ${movieDetails.results.year}</p>
                    <p>IMDB Rating: ${movieDetails.results.rating}</p>
                    <p>${movieDetails.results.plot}</p>
                    <div class="trailer-container">
                        <iframe width="640" height="360" src="${movieDetails.results.trailer}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
    
                // Append the details to the movieElement
                movieElement.innerHTML += detailsHTML;
            } else {
                console.warn('No details found or invalid data:', movieDetails);
            }
        })
        .catch(error => console.error('Error fetching movie details:', error));
    }
    
    function displayMovieResults(moviesData, genres, maxMovies) {
        console.log('Movies Data received:', moviesData);
    
        const movieResultsContainer = document.getElementById('movie-results');
        movieResultsContainer.innerHTML = ''; // Clear previous results
    
        const resultMessageText = `Based on your selections, it seems that you prefer ${genres.join(', ')} movies. Here are some movies we think you may like!`;
        resultMessage.innerText = resultMessageText;
    
        if (moviesData && moviesData.results && Array.isArray(moviesData.results)) {
            // Use Math.min to ensure that we don't exceed the maxMovies limit
            const numMoviesToDisplay = Math.min(moviesData.results.length, maxMovies);
    
            for (let i = 0; i < numMoviesToDisplay; i++) {
                const movie = moviesData.results[i];
    
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
    
                // Make a new API call to get detailed information based on IMDb ID
                fetchMovieDetails(movie.imdb_id, movieElement);
    
                movieResultsContainer.appendChild(movieElement);
            }
        } else {
            console.warn('No movies found or invalid data:', moviesData);
            movieResultsContainer.innerHTML = 'No movies found for the selected genres.';
        }
    }
});
