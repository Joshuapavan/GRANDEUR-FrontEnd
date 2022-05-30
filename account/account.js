const loginButton = document.getElementById('login');

if(loginButton){
loginButton.addEventListener('click',async function(event){

  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const mailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';

  if(!email.match(mailRegex)){
    showAlert('Please enter a valid email address');
  }
  else if(email == '' || email == null){
    showAlert('Please enter an email address');
  }
  else if(password == '' || password == null){
    showAlert('Please enter the password');
  }
  else if((email == '' || email == null) && (password == '' || password == null)){ 
    showAlert("Enter your email and password");
  }
  else{
    const signInApi = 'http://localhost:8090/api/v1/clients/signIn';
    const response = await fetch(signInApi,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify(
      {
        'email' : email,
        'password' : password
      }
    )
  })

    var data = await response.json();

    if(response.status >= 200 && response.status < 300) { 
      showAlert('Welcome, '+data.name);
      window.location.replace("http://127.0.0.1:5501/home/home.html");

      validate(data.name, data.email);
      }
    if(response.status >= 400 && response.status < 500) {
      showAlert("Invalid Credentials, Please try again \n Response Code : ("+response.status+")")
      clearStorage();
    }
    if(response.status >= 500 && response.status < 600) {
      showAlert("Internal server error: "+response.status);
      clearStorage();
    }

    if(data.name.length == 0 && data.email.length == 0){
      showAlert("login failed, please try again later");
      clearStorage();
    }
  }

});
}


function clearStorage(){
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('search');
  localStorage.removeItem('redirected');
}


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