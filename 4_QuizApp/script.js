// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the buttons by their IDs
    var signupBtn = document.getElementById("signupBtn");
    var joinBtn = document.getElementById("joinBtn");
    var bcktoHome = document.getElementById("bcktoHome");

    // Add click event listeners
    signupBtn.addEventListener("click", function () {
        // Redirect to the SignUp/Login page
        window.location.href = "https://ankitrajcs13.github.io/JavaScript-Projects/4_QuizApp/Users/index.html"; 
    });

    joinBtn.addEventListener("click", function () {
        // Redirect to the Join Game page
        window.location.href = "https://ankitrajcs13.github.io/JavaScript-Projects/4_QuizApp/Quiz/index.html"; 
    });
    bcktoHome.addEventListener("click", function () {
        // console.log("hello")
        window.location.href = "https://ankitrajcs13.github.io/JavaScript-Projects/4_QuizApp/index.html";
    });
});
