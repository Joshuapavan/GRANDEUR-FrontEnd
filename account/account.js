// const account = document.querySelector('#account-click');

// account.addEventListener('click', () => {
//   // preventDefault();
//   window.location.href = '/Grandeur-FrontEnd/home/home.html';
// })



async function validate() {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // let userName; 
  // let userEmail;

  const mailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';

  if(!email.match(mailRegex)){
    alert('Please enter a valid email address');
  }
  else
  if(email.length > 0 && password.length > 0){
    const response = await fetch('http://localhost:8090/api/v1/clients/signIn',{
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
      // printing something related to success response // 
      alert("welcome Back "+data.name)
    }
    if(response.status >= 400 && response.status < 500) {
      alert("Invalid Credentials, Please try again \n Response Code : ("+response.status+")")
    }
    if(response.status >= 500 && response.status < 600) {
      alert("Internal server error: "+response.status)
    }

    if(data.name.length == 0){

    }
}
else{
  alert('Enter email and password');
  }
}