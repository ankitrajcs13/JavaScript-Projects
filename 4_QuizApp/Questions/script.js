var currentQuestionIndex = 0;
var questions;
var correctAnswers = 0;
var timerSeconds = 10;
var timerInterval;

function fetchQuestions() {
    // Fetch questions from the JSON file
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
            startTimer();
        })
        .catch(error => console.error('Error fetching questions:', error));
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
        if (selectedIndex === questions[currentQuestionIndex].correctAnswer) {
            correctAnswers++;
            showPopup("Correct!");
        } else {
            showPopup("Incorrect. The correct answer is: " + questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswer]);
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
            window.location.href= '/index.html'

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
fetchQuestions();
