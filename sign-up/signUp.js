async function validate() {
  const firstName=document.getElementById("firstName").value;
  const lastName=document.getElementById("lastName").value;
  const email=document.getElementById("email").value;
  const pwd=document.getElementById("pwd").value;
  const confirmPwd=document.getElementById("confirmPwd").value;
  const errorMessage = document.getElementById("error-message");
  const fullName=firstName+lastName;
  const mailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';
  const labelForMail = document.getElementById("label-for-mail");

  if(!email.match(mailRegex)) {
    labelForMail.innerHTML = "invalid email Id";
  }
  else{
  if(pwd !== confirmPwd){
    errorMessage.innerHTML = "passwords don't match. Please try again!";
  }
  else{
      await fetch("http://localhost:8090/api/v1/registration", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(
        {
        "name" : fullName,
        "email" : email,
        "password": pwd
      })
}).then(response => {
  if(response.status >= 200 && response.status < 300) {
    // printing something related to success response // 
    alert("welcome "+fullName+" to Grandeur")
  }
  
  if(response.status >= 400 && response.status < 500) {
    alert("the email "+email+" already exists"+response.status)
  }
  
  if(response.status >= 500 && response.status < 600) {
    alert("Internal server error: "+response.status)
  }
})

// .then(data => {
//   window.alert('Email already exist:', data.email);
//   // console.log(data);
// })
// .catch((error) => {
//   window.alert('Please check your mail to validate:', error);
// });
  }
  }
}