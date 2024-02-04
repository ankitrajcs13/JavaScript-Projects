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
import { firebaseConfig } from '../../firebaseConfig.js';
console.log(",ad",firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);
const analytics = getAnalytics(app);

document.addEventListener("DOMContentLoaded", function () {
  var addQuestionBtn = document.getElementById("addQuestionBtn");

  addQuestionBtn.addEventListener("click", function () {
    addQuestion();
  });

  function addQuestion() {
    var questionInput = document.getElementById("question");
    var option1Input = document.getElementById("option1");
    var option2Input = document.getElementById("option2");
    var option3Input = document.getElementById("option3");
    var option4Input = document.getElementById("option4");

    var question = questionInput.value.trim();
    var option1 = option1Input.value.trim();
    var option2 = option2Input.value.trim();
    var option3 = option3Input.value.trim();
    var option4 = option4Input.value.trim();

    // Validate inputs
    if (
      question === "" ||
      option1 === "" ||
      option2 === "" ||
      option3 === "" ||
      option4 === ""
    ) {
      alert("Please enter a valid question and all four options.");
      return;
    }

    var newQuestion = {
      question: question,
      options: [option1, option2, option3, option4],
    };

    var existingQuestions = localStorage.getItem("questions");
    var questionsArray = existingQuestions ? JSON.parse(existingQuestions) : [];

    questionsArray.push(newQuestion);

    localStorage.setItem("questions", JSON.stringify(questionsArray));

    // Clear input fields
    questionInput.value = "";
    option1Input.value = "";
    option2Input.value = "";
    option3Input.value = "";
    option4Input.value = "";

    alert("Question added successfully!");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var addTopicBtn = document.getElementById("addTopicBtn");
  var addSlideBtn = document.getElementById("addSlideBtn");
  var saveQuizBtn = document.getElementById("saveQuizBtn");
  var slidesContainer = document.getElementById("slides-container");

  // addTopicBtn.addEventListener("click", function () {
  //     addTopic();
  // });

  addSlideBtn.addEventListener("click", function () {
    addSlide();
  });

  saveQuizBtn.addEventListener("click", function () {
    saveQuiz();
  });

  function addTopic() {
    console.log("Topic added");
  }

  function addSlide() {
    var slideDiv = document.createElement("div");
    slideDiv.classList.add("slide");

    var questionNumber = slidesContainer.children.length + 1;

    slideDiv.innerHTML = `
    <h2>Question ${questionNumber}</h2>
    <label for="question">Question:</label>
    <input type="text" class="question" placeholder="Enter your question">

    <div class="options-container">
        <div class="option-row">
            <label for="option1">A:</label>
            <input type="text" class="option" placeholder="Enter option 1">
            <input type="radio" name="correctOption${questionNumber}" value="A">
            
            <label for="option2">B:</label>
            <input type="text" class="option" placeholder="Enter option 2">
            <input type="radio" name="correctOption${questionNumber}" value="B">
        </div>

        <div class="option-row">
            <label for="option3">C:</label>
            <input type="text" class="option" placeholder="Enter option 3">
            <input type="radio" name="correctOption${questionNumber}" value="C">
            
            <label for="option4">D:</label>
            <input type="text" class="option" placeholder="Enter option 4">
            <input type="radio" name="correctOption${questionNumber}" value="D">
        </div>
    </div>
    <button class="btn delete-slide-btn">Delete Slide</button>
`;

    slidesContainer.appendChild(slideDiv);

    var deleteSlideBtn = slideDiv.querySelector(".delete-slide-btn");
    deleteSlideBtn.addEventListener("click", function () {
      deleteSlide(slideDiv);
    });
    let userCreds = JSON.parse(localStorage.getItem("user-creds"));
    console.log("Printing cred", userCreds);
  }
  function deleteSlide(slideDiv) {
    // Remove the slide from the container
    slidesContainer.removeChild(slideDiv);

    // Update question numbers
    updateQuestionNumbers();
  }

  function updateQuestionNumbers() {
    var slides = slidesContainer.children;
    for (var i = 0; i < slides.length; i++) {
      var questionNumber = i + 1;
      slides[i].querySelector("h2").innerText = "Question " + questionNumber;
    }
  }

  function saveQuiz() {
    var quizName = document.getElementById("topic").value;
    var joinKey = Math.floor(100000 + Math.random() * 900000);

    var slides = slidesContainer.children;
    var questions = [];

    if(quizName === ''){
      alert('Please Enter topic NaMe');
      return;
    }

    for (var i = 0; i < slides.length; i++) {
      var questionElement = slides[i].querySelector(".question");
      var optionElements = slides[i].querySelectorAll(".option");
      var correctOption = slides[i].querySelector(`input[name="correctOption${i + 1}"]:checked`); 
      var questionText = questionElement.value.trim();
      var options = [];

      // Validate question and options
      if (questionText === "") {
        alert("Please enter a valid question.");
        return;
      }

      for (var j = 0; j < optionElements.length; j++) {
        var optionText = optionElements[j].value.trim();

        // Validate options
        if (optionText === "") {
          alert("Please enter valid options for all choices.");
          return;
        }

        options.push(optionText);
      }

      // Add question to the array
      questions.push({
        question: questionText,
        options: options,
        correctOption: correctOption ? correctOption.value : null,
      });
    }
    if(questions.length < 10){
      alert("Please enter atleast 10 questions");
      return;
    }

    let userCreds = JSON.parse(localStorage.getItem("user-creds"));
    console.log("Printing cred", userCreds);

    var userUid = userCreds.uid; 
    var quizData = {
      quizName: quizName,
      joinKey: joinKey,
      questions: questions,
    };

    // Save the quiz data to Firebase using the unique key
    set(ref(db, "User/" + userUid + "/" + joinKey), quizData);

    alert("Quiz saved successfully!");
    window.location.href = '/Users/Create/index.html'
  }
  fetchQuizzes();
});
fetchQuizzes();


function fetchQuizzes() {
  let userCreds = JSON.parse(localStorage.getItem("user-creds"));
  let userUid = userCreds ? userCreds.uid : null;
  console.log(userUid)

  if (!userUid) {
      console.error("User UID is undefined.");
      return;
  }

  // Reference to the quizzes in your Firebase database
  const quizzesRef = ref(db, "User/" + userUid);
  console.log(quizzesRef)

  // Fetch the quiz keys
  get(quizzesRef).then((snapshot) => {
    if (snapshot.exists()) {
        // Process the fetched data and display or perform actions
        const quizData = snapshot.val();
        console.log(quizData);
        displayQuizzesTable(quizData);
    } else {
        console.log("No quizzes found for the user");
    }
}).catch((error) => {
    console.error("Error fetching quiz data: ", error);
});
}


// Display quizzes in a table or perform other actions
function displayQuizzesTable(quizzes) {
  // Get the container where you want to display the table
  const tableContainer = document.getElementById('quizzes-table-container');

  // Create the table structure
  let tableHTML = '<table border="1"><tr><th>Quiz Name</th><th>Join Key</th></tr>';

  // Check if quizzes is empty
  if (quizzes.length === 0) {
    tableHTML += '<tr><td colspan="2">No quizzes available right now. Please create one.</td></tr>';
  } else {
    // Loop through each quiz
    for (const joinKey in quizzes) {
      const quiz = quizzes[joinKey];

      // Check if quizName is defined
      if (quiz.quizName !== undefined) {
        tableHTML += `<tr><td>${quiz.quizName}</td><td>${joinKey}</td></tr>`;
      }
    }
  }

  tableHTML += '</table>';

  // Display the table in the container
  tableContainer.innerHTML = tableHTML;
}

