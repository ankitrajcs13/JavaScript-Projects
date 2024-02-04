//signup
var signupbtn=document.getElementById("signupbtn")
var emailsignup=document.getElementById("useremail")
var user=document.getElementById("user")
var passswordsignup=document.getElementById("userpass")

//================Signup With Email and Password==========================



// email validator

const emailField = document.getElementById('useremail');
const errorMsg = document.getElementById('error-msg');

emailField.addEventListener('input', () => {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.textContent = 'Please enter a valid email address';
    } else {
        errorMsg.textContent = '';
    }
});


signupbtn.onclick=function(){
    signupbtn.disabled=true;
    signupbtn.textContent="Registering Your Account! Please Wait";
    firebase.auth().createUserWithEmailAndPassword(emailsignup.value,passswordsignup.value).then(function(response){
        console.log(response);
        emailsignup.value='';
        passswordsignup.value='';
        if (user) {
            user.value='';
        }
        // Redirect to signup.html
        console.log('Redirecting to signup.html');
        var url = "/screens/signup.html";
        window.location.href = url;
    })
    .catch(function(error){
        signupbtn.disabled=false;
        signupbtn.textContent="Sign Up";
        console.log(error);
        emailsignup.value='';
        passswordsignup.value='';
        if (user) {
            user.value='';
        }
    })
}


// to hide/unhide password field
const passwordInput = document.getElementById("userpass");
  const togglePasswordButton = document.getElementById("toggle-password");

  togglePasswordButton.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePasswordButton.querySelector("i").classList.toggle("fa-eye-slash");
  });



// // ================Sign in With Email and Password==========================
// function signIn(user) {
//     firebase.auth().signInWithEmailAndPassword(user.email, passswordsignup.value)
//     .then((userCredential) => {
//         // Navigate to dashboard.html on successful login
//         window.location.href = "dashboard.html";
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// }

