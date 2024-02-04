import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  push,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// import { firebaseConfig } from '../firebaseConfig.js';
var firebaseConfig = {
    apiKey: "AIzaSyAnN2YWqnEQl0OY5JcQbFpEKGZ5mA7EmzA",
    authDomain: "rapidquiz-bb0ce.firebaseapp.com",
    projectId: "rapidquiz-bb0ce",
    storageBucket: "rapidquiz-bb0ce.appspot.com",
    messagingSenderId: "656703050076",
    appId: "1:656703050076:web:da0e70e8695c7c1e2df199",
    measurementId: "G-MMPHB26P2F"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);
const analytics = getAnalytics(app);






var currentQuestionIndex = 0;
var questions;
var correctAnswers = 0;
var timerSeconds = 10;
var timerInterval;

// function fetchQuestions() {
//     // Fetch questions from the JSON file
//     fetch('questions.json')
//         .then(response => response.json())
//         .then(data => {
//             questions = data;
//             displayQuestion();
//             startTimer();
//         })
//         .catch(error => console.error('Error fetching questions:', error));
// }
function fetchQuestions(quizKey) {
    // Fetch questions for the specified quiz from Firebase
    let userCreds = JSON.parse(localStorage.getItem("user-creds"));
    console.log("Printing cred", userCreds);

    let heading = document.getElementById("name");

   var userUid = userCreds.uid; // You need to retrieve the user's UID, either from authentication or another source
   const quizRef = ref(db, "User/" + userUid + "/" + quizKey);
  
    get(quizRef)
      .then((snapshot) => {
        const quizData = snapshot.val();
        heading.innerText = `${quizData.quizName}`
        console.log(quizData)
        if (quizData) {
          questions = quizData.questions;
          displayQuestion();
          startTimer();
        } else {
          console.error("Quiz data not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        // Handle the error, e.g., show an error message or redirect to an error page
        // For example, you can redirect to an error page like this:
        window.location.href = 'https://ankitrajcs13.github.io/JavaScript-Projects/4_QuizApp/error.html';
    });
  }
  

function displayQuestion() {
    var questionElement = document.getElementById("question");
    var optionsForm = document.getElementById("options");

    questionElement.textContent = questions[currentQuestionIndex].question;

    optionsForm.innerHTML = "";
    for (var i = 0; i < questions[currentQuestionIndex].options.length; i++) {
        var optionButton = document.createElement("button");
        optionButton.textContent = questions[currentQuestionIndex].options[i];
        optionButton.className = "option-btn";
        optionButton.onclick = function (index) {
            return function () {
                checkAnswer(index);
            };
        }(i);
        optionsForm.appendChild(optionButton);
    }
}

function checkAnswer(selectedIndex) {
    clearInterval(timerInterval);

    if (selectedIndex === -1) {
        showPopup("Time's up! You didn't select an option.");
    } else {
        var correctOption = questions[currentQuestionIndex].correctOption.charCodeAt(0) - 65 ;
        console.log(correctOption)

        if (correctOption && selectedIndex === correctOption) {
            correctAnswers++;
            showPopup("Correct!");
        } else {
            showPopup("Incorrect. The correct answer is: " + questions[currentQuestionIndex].options[correctOption]);
        }
    }

    var options = document.getElementById("options").getElementsByClassName("option-btn");
    for (var i = 0; i < options.length; i++) {
        options[i].onclick = null;
    }

    setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        showPopup("Quiz completed! Correct answers: " + correctAnswers);

        setTimeout(function(){
            window.location.href= 'https://ankitrajcs13.github.io/JavaScript-Projects/4_QuizApp/index.html'

        },5000);
    }
}

function startTimer() {
    var timeElement = document.getElementById("time");
    var timerValue = timerSeconds;

    timerInterval = setInterval(function () {
        timeElement.textContent = timerValue;

        if (timerValue <= 0) {
            clearInterval(timerInterval);
            checkAnswer(-1); 
        }

        timerValue--;
    }, 1000);
}

function showPopup(message) {
    var popup = document.getElementById("popup");
    var popupContent = document.getElementById("popup-content");
    var popupMessage = document.getElementById("popup-message");

    popupMessage.textContent = message;
    popup.style.display = "flex";

    var popupClose = document.getElementById("popup-close");
    popupClose.onclick = function () {
        closePopup();
    };

    
    if (message.includes("Correct")) {
        setTimeout(closePopup, 2000);
    }
}


function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Initial question display
let quizKey = sessionStorage.getItem("quizPin");
console.log(quizKey);
fetchQuestions(quizKey);
