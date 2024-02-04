function validatePin(){
    var pinInp = document.getElementById("pinInput").value;

    if (pinInp.length === 6) {
        // Show loader
        var loader = document.getElementById("loader");
        loader.style.display = "block";

        // Set a timeout to simulate a loading process
        setTimeout(function () {
            // Save pin in sessionStorage
            sessionStorage.setItem("quizPin", pinInp);

            // Redirect to the Questions page
            window.location.href = '/Questions/index.html';
        }, 2000);
    }
    else{
        alert("Invalid Pin. Please enter correct pin");
    }
}
