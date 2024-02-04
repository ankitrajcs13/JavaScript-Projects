// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the buttons by their IDs
    var signupBtn = document.getElementById("signupBtn");
    var joinBtn = document.getElementById("joinBtn");
    var bcktoHome = document.getElementById("bcktoHome");

    // Add click event listeners
    signupBtn.addEventListener("click", function () {
        // Redirect to the SignUp/Login page
        window.location.href = "/Users/index.html"; // Replace with the actual path
    });

    joinBtn.addEventListener("click", function () {
        // Redirect to the Join Game page
        window.location.href = "/Quiz/index.html"; // Replace with the actual path
    });
    bcktoHome.addEventListener("click", function () {
        // console.log("hello")
        window.location.href = "/index.html"; // Replace with the actual path
    });
});
