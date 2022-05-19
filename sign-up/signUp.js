async function validate() {
  const firstName=document.getElementById("firstName").value;
  const lastName=document.getElementById("lastName").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("pwd").value;
  const confirmPassword=document.getElementById("confirmPwd").value;
  const errorMessage = document.getElementById("error-message");
  const fullName=firstName+lastName;
  const mailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';
  const labelForMail = document.getElementById("label-for-mail");

  if(!email.match(mailRegex)) {
    labelForMail.innerHTML = "invalid email Id";
  }
  else
  if(password == confirmPassword && email.match(mailRegex)){

    const signUpApi = 'http://localhost:8090/api/v1/registration';
    const response = await fetch(signUpApi,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          'name': fullName,
          'email': email,
          'password': password
        })
    })

    var data = await response.json();

    // if response is okay 
    if(response.status >= 200 && response.status < 300) {
      alert("Welcome to Grandeur, "+data.name+"!\nPlease verify your email address in the inbox.");
    }
    
    if(response.status >= 400 && response.status < 500){
      // checking if the email already exists // 
      if(data.error == 'Conflict'){
        alert('the email '+email+' already exists.\nPlease try again ('+response.status+')')
      }
      else{
        alert(response.error)
      }
    }
    // 
    if(response.status >= 500 && response.status < 600) {
      alert("Internal server error! "+response.error+"\n"+response.status)
    }
  }
  else{
    errorMessage.innerHTML = "passwords don't match. Please try again!";
  }

}

//   else{
//       const response = await fetch("http://localhost:8090/api/v1/registration", {
//       method: "POST",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify(
//         {
//         "name" : fullName,
//         "email" : email,
//         "password": pwd
//       })
// })

//   var data = await response.json();

//   if(response.status >= 200 && response.status < 300) {
//     // printing something related to success response // 
//     alert("welcome "+data.name+" to Grandeur.\ Please check your ")
//   }
  
//   if(response.status >= 400 && response.status < 500) {
//     alert("the email "+data.email+" already exists. Please try again ("+response.status+")")
//   }
  
//   if(response.status >= 500 && response.status < 600) {
//     alert("Internal server error: "+response.status)
//   }
// }

