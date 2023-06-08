const signupButton = document.getElementById('btn-sign');

signupButton.addEventListener('click', async function(event){

  event.preventDefault();

  const firstName=document.getElementById("firstName").value;
  const lastName=document.getElementById("lastName").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("pwd").value;
  const confirmPassword=document.getElementById("confirmPwd").value;
  const checkbox = document.getElementById("checkbox");
  const mailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';
  const labelForMail = document.getElementById("label-for-mail");

  if(!email.match(mailRegex)) {
    labelForMail.innerHTML = "invalid email Id";
    showAlert('Invalid Email')
  }
  else if(!email.match(mailRegex)) {
    labelForMail.innerHTML = "invalid email Id";
  }
  
  else if(password != confirmPassword) {
    showAlert('Passwords don\'t match')
  }
  else if(!checkbox.checked) {
    showAlert('Please Accept Our T&C')
  }
  else{
    const API_URL = 'http://localhost:3000'
    const signUpApi = API_URL+'/users/sign_up';
    const response = await fetch(signUpApi,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          'first_name': firstName,
          'last_name': lastName,
          'email': email,
          'password': password
        })
    })

    var data = await response.json();
    validate(data.first_name, data.email);

    // if response is okay 
    if(response.status >= 200 && response.status < 300) {
      showAlert("Welcome to CARZ, "+data.first_name+"!");
      window.location.replace("http://127.0.0.1:5501/home/home.html");
      // showAlert("Welcome to CARZ, "+data.first_name+"!\nPlease verify your email address in the inbox.");
      // window.location.replace("https://mail.google.com/");
    }
  
    if(response.status >= 400 && response.status < 500){
      // checking if the email already exists // 
      if(data.error == 'Conflict'){
        showAlert('the email '+email+' already exists.\nPlease try again ('+response.status+')');
      }
      else{
        showAlert(response.error);
      }
    }
    // 
    if(response.status >= 500 && response.status < 600) {
      showAlert("Internal server error! "+response.error+"\n"+response.status);
    }
  }
});


function validate(name, email){
  const localName = localStorage.getItem('name');
  const localEmail = localStorage.getItem('email');

  if(localName != name && localEmail != email){
    localStorage.setItem('name',name);
    localStorage.setItem('email',email);
  }
}

function showAlert(message){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    background : '#EE7600',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    title: '',
    text: message,
    color: '#000000'
  })
  }
