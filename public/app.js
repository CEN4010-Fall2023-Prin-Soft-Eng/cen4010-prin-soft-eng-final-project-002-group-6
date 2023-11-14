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

// Function to handle user login
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Handle successful sign-in
            console.log('User signed in:', user);
            redirectToHomepage('Successfully logged in!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle error
            console.error('Login error:', errorCode, errorMessage);
        });
}

// Function to handle user sign-up
function signUpUser() {
    console.log('signUpUser function called!');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User signed up:", user);
        redirectToHomepage('Account successfully created!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorCode, errorMessage);
        // Handle the error or display a message to the user
      });
}

// Function to redirect to the homepage with a success message
function redirectToHomepage(message) {
    // Display a success message on the homepage
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `<p>${message}</p>`;

    // Delay the redirection for 1000 milliseconds (1 second)
    setTimeout(() => {
        // Redirect to the homepage
        window.location.href = 'index.html';
    }, 1000);
}


// Attach event listeners
document.addEventListener('DOMContentLoaded', function () {
    console.log(document.getElementById('loginButton')); // Log the element
    console.log(document.getElementById('signupButton')); // Log the element

    document.getElementById('loginButton').addEventListener('click', loginUser);
    document.getElementById('signupButton').addEventListener('click', signUpUser);
});
