function validatePin(){
    var pinInp = document.getElementById("pinInput").value;

    if(pinInp.length === 6){
        window.location.href = '/Questions/index.html'
    }
    else{
        alert("Invalid Pin. Please enter correct pin");
    }
}