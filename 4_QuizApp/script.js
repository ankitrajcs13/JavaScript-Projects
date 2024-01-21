function validatePin(){
    var pinInp = document.getElementById("pinInput").value;

    if(pinInp.length === 6){
        window.location.href = 'https://ankitrajcs13.github.io/JavaScript-Projects/4_QuizApp/Questions/index.html'
    }
    else{
        alert("Invalid Pin. Please enter correct pin");
    }
}
