// const account = document.querySelector('#account-click');

// account.addEventListener('click', () => {
//   // preventDefault();
//   window.location.href = '/Grandeur-FrontEnd/home/home.html';
// })



async function validate() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const mailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';

  if(!email.match(mailRegex)){
    alert('Please enter a valid email address');
  }
  else
  if(email.length > 0 && password.length > 0){
    await fetch('http://localhost:8090/api/v1/clients/signIn',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify(
      {
        'email' : email,
        'password' : password
      }
    )
  })
  .then(response => {
    if(response.status >= 200 && response.status < 300) {
      // printing something related to success response // 
      alert("welcome to Grandeur")
      // window.location.href = './/home/home.html';
    }
    
    if(response.status >= 400 && response.status < 500) {
      alert("Please enter a valid email address")
    }
    
    if(response.status >= 500 && response.status < 600) {
      alert(response.statusText)
    }
  })
}
else{
  alert('Enter email and password');
  }
}