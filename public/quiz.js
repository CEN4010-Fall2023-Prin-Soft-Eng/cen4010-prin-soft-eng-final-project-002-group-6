// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";

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
    const submitBtn = document.getElementById('submit-btn');
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

    // You can implement the function fetchMovies to make the API call and display movie results

    function fetchMovies(selectedGenre) {
        const http = require('https');
    
        const options = {
            method: 'GET',
            hostname: 'moviesminidatabase.p.rapidapi.com',
            port: null,
            path: `/movie/byGen/${selectedGenre}/`,
            headers: {
                'X-RapidAPI-Key': '38672978a3mshb0e70ee4a14db29p110155jsnb9b1f54aa483',
                'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
            }
        };
    
        const req = http.request(options, function (res) {
            const chunks = [];
    
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
    
            res.on('end', function () {
                const body = Buffer.concat(chunks);
                const moviesData = JSON.parse(body.toString());
    
                displayMovieResults(moviesData);
            });
        });
    
        req.end();
    }
    
    function displayMovieResults(moviesData) {
        const movieResultsContainer = document.getElementById('movie-results');
        movieResultsContainer.innerHTML = ''; // Clear previous results
    
        if (moviesData && moviesData.length > 0) {
            moviesData.forEach((movie) => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `<h3>${movie.title}</h3><p>${movie.description}</p>`;
                movieResultsContainer.appendChild(movieElement);
            });
        } else {
            movieResultsContainer.innerText = 'No movies found for this genre.';
        }
    }
    
});
