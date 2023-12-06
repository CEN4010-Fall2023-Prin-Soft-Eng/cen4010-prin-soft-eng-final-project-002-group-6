# cen4010-prin-soft-eng-final-project-final-project-002-group-6
cen4010-prin-soft-eng-final-project-final-project-002-group-6 created by GitHub Classroom

Team Members:
>- Lou Salvant
>- Sean Bruce-Ortiz
>- Daniel Azafrani
>- Shahmeer Khan

URL:
https://cinemate-4c026.web.app/

Navigation Bar:
- Provides easy access to different sections of the website, including Home, Popular Movies/New Releases, Search, Quiz, Login/Sign up, and Account Overview.
- Features a dropdown menu for seamless navigation on smaller screens.
  
  ![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/af3422e9-107d-44a5-ba4c-8848f85da68c)
  ![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/13cfed53-d6de-444b-92da-b1831e087b5c)


Firebase Authentication:
-Integrates Firebase Authentication for secure user login and sign-up.
-Ensures confidentiality of user credentials and provides a streamlined authentication process.

![Screenshot 2023-11-28 154742](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/47389364-bfce-4734-9711-a60258de1169)

Firebase Firestore Integration:
- Utilizes Firebase Firestore to securely store additional user information.
- Stores first name, last name, and email upon successful sign-up, enriching user profile data.

  ![Screenshot 2023-11-28 155543](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/fa85e2ee-d25f-43a8-89ef-c2ac77d4de53)

Login/Sign Up Page:
- Allows users to log in or sign up.
- Includes standard fields for email and password.
  
![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/0bac4b53-6e39-4921-ab90-1b5256b9f729)


- Hidden fields for first name, last name, and confirm password appear when signing up.
- Displays dynamic error messages for password mismatches and general errors.
  
  ![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/b9adb8b8-1434-4dc8-ad73-221698880141)


User Login Functionality:
- Uses Firebase Authentication for user login.
- Upon successful login, redirects the user to the homepage and fetches additional user details from Firestore.
![Screenshot 2023-11-28 170645](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/7951f599-a2c2-409e-b409-c0141f80097b)

User Sign-Up Functionality:
- Guides users through the account creation process.
- Features a toggle for additional fields and stores user details in Firestore upon successful sign-up.
- Redirects the user to the homepage with a personalized welcome message.
![Screenshot 2023-11-28 172135](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/0e43b9bf-52d0-47d9-8c21-8480d04b6369)

Account Overview Page:

![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/906005b9-e696-44c5-9d76-fab515a388d1)
![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/ca3c9001-bd6a-4906-9aa3-e1c25e9b5546)


User Details Display:
- Dynamically fetches and displays user details on the account page.
- Enhances the user experience with personalized information.

Update User Info Functionality:
- Allows users to modify their profile information.
- Features a toggle for updating info container and buttons.
- Dynamically updates and displays changes after saving, providing users control over their profile data.

![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/77b2cfba-74a3-497d-bc75-189b633fb0e6)



Logout Functionality:
- Ensures the security of user sessions.
- Firebase Authentication handles the sign-out process, redirecting users to the login page.

Quiz Page:

![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/3fa167ae-05f8-459e-91fc-f11ee10a47c2)



Firebase Integration:
- The quiz page integrates with Firebase for user authentication. Users need to be logged in to participate in the quiz.

![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/d50201a2-0038-425f-84d0-c9c19a0877d0)


Quiz Data:
- The quiz consists of a set of questions, each with multiple choices. Each question is associated with specific movie genres.

![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/5ca3f2eb-81bf-4905-957f-f44f2007c04f)



Question Flow:
- Users start the quiz by clicking the "Start" button after logging in. If not logged in, they are redirected to the login page.
- Questions are displayed one at a time, and users choose their preferences from the provided choices.
- The user's genre selections are stored for later use.

Movie Recommendations:
- Once the user completes the quiz, the selected genres are used to fetch movie recommendations from an external movie database using the RapidAPI service.

Movie Display:
- The recommended movies are displayed on the page, showing movie posters, titles, ratings, release years, and plots.
- A trailer iframe is also included for each recommended movie.

![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/64cf03d6-9bb5-42a3-a733-126bbbb03c29)
![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/74f977e4-1258-45a8-8b5a-05a09666bf52)

Home Page:
- Features the WebApp's Logo and 3 images which directs you to it's respective webpage. 
![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/69bd1c02-1b51-474d-a127-9420c9232f13)

Upcoming Releases:
- Showcases upcoming movie titles in rows of 3 by Movie Image, Title, and Release Date.
- Upon loading the webpage, JavaScript dynamically creates new HTML elements populated using JSON data received from an external API called "MoviesDatabase."
- In the Upcoming.js file, EventListener 'DOMContentLoaded' calls the fetchUpcomingMovies function. 
- Link to the API used: https://rapidapi.com/SAdrian/api/moviesdatabase/
![image](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/143464399/e71953ac-6ad9-46ab-8e4e-bc812673e455)


Search:









