# cen4010-prin-soft-eng-final-project-final-project-002-group-6
cen4010-prin-soft-eng-final-project-final-project-002-group-6 created by GitHub Classroom

Team Members:
>Lou Salvant
>Sean Bruce-Ortiz
>Daniel Azafrani
>Shahmeer Khan

URL:
https://cinemate-4c026.web.app/

Navigation Bar:
- Provides easy access to different sections of the website, including Home, Popular Movies/New Releases, Search, Quiz, Login/Sign up, and Account Overview.
- Features a dropdown menu for seamless navigation on smaller screens.
  ![Screenshot 2023-11-28 153414](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/e80aa2a7-a74a-4b54-92c2-0010583ff9d9)
![Screenshot 2023-11-28 153453](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/135cd69b-b053-44b3-8c28-1557c61e503e)

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
![Screenshot 2023-11-28 174519](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/63ba57d0-4214-4b30-81a2-95aeb58ff17d)

- Hidden fields for first name, last name, and confirm password appear when signing up.
- Displays dynamic error messages for password mismatches and general errors.
  ![Screenshot 2023-11-28 170329](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/db72beda-ae12-43d1-969c-b7754fde585a)

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
![Screenshot 2023-11-28 172636](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/0af47bc0-0132-4704-aae6-74ec3c47d20c)

User Details Display:
- Dynamically fetches and displays user details on the account page.
- Enhances the user experience with personalized information.

Update User Info Functionality:
- Allows users to modify their profile information.
- Features a toggle for updating info container and buttons.
- Dynamically updates and displays changes after saving, providing users control over their profile data.
![Screenshot 2023-11-28 172749](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/76722e01-b8a8-4b89-b6d7-77f3c261582a)

Logout Functionality:
- Ensures the security of user sessions.
- Firebase Authentication handles the sign-out process, redirecting users to the login page.

Quiz Page:
![Screenshot 2023-11-28 174557](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/562fe4aa-3cd3-483a-98e7-f9d7b0efd132)

Firebase Integration:
- The quiz page integrates with Firebase for user authentication. Users need to be logged in to participate in the quiz.
![Screenshot 2023-11-28 175105](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/c1ae58f9-f1bc-486a-b1c5-9efee7f87cc7)

Quiz Data:
- The quiz consists of a set of questions, each with multiple choices. Each question is associated with specific movie genres.
![Screenshot 2023-11-28 174922](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/e70cf75d-a426-4365-9886-59e35cd8bcd6)

Question Flow:
- Users start the quiz by clicking the "Start" button after logging in. If not logged in, they are redirected to the login page.
- Questions are displayed one at a time, and users choose their preferences from the provided choices.
- The user's genre selections are stored for later use.

Movie Recommendations:
- Once the user completes the quiz, the selected genres are used to fetch movie recommendations from an external movie database using the RapidAPI service.

Movie Display:
- The recommended movies are displayed on the page, showing movie posters, titles, ratings, release years, and plots.
- A trailer iframe is also included for each recommended movie.
![Screenshot 2023-11-28 175214](https://github.com/CEN4010-Fall2023-Prin-Soft-Eng/cen4010-prin-soft-eng-final-project-final-project-002-group-6/assets/116595993/b1fcf7a6-8614-49ec-895e-66bbe223839a)
