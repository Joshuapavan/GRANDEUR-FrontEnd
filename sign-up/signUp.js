function validate() {
  const firstName=document.getElementById("firstName").value;
  const lastName=document.getElementById("lastName").value;
  const email=document.getElementById("email").value;
  const pwd=document.getElementById("pwd").value;
  const confirmPwd=document.getElementById("confirmPwd").value;
  const buttonClick = document.getElementById("buttonClick");
  const errorMessage = document.getElementById("error-message");
  const fullName=firstName+lastName;
  if(pwd !== confirmPwd){
    errorMessage.innerHTML = "passwords don't match. Please try again!";
  }
  fetch("http://localhost:8090/api/v1/registration", {
       method: "POST",
      body: JSON.stringify({
        "name" : fullName,
        "email" : email,
        "password": pwd
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 .then(response => response.json())
 .then(json => console.log());
}

// buttonClick.addEventListener("click", (firstName) => {
//   // e.preventDefault();
//   console.log(firstName.value);
// })