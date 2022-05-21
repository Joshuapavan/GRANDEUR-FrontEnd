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
    var cookie = document.cookie;

    if(response.status >= 200 && response.status < 300) {
      // printing something related to success response // 
      alert("welcome Back "+data.name)
      if(cookie === ""){
        createCookie(data.name,data.email);
      }
      else{
        if(cookie.name != data.name){
          cookie = "name=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
          cookie = "email= expires = Thu, 01 Jan 1970 00:00:00 GMT";
          createCookie(data.name,data.email);
        }
        alert("created cookie ");

      }
    }
    if(response.status >= 400 && response.status < 500) {
      alert("Invalid Credentials, Please try again \n Response Code : ("+response.status+")")
    }
    if(response.status >= 500 && response.status < 600) {
      alert("Internal server error: "+response.status)
    }

    if(data.name.length == 0 && data.email.length == 0){
      alert("login failed, please try again later");
    }
}
else{
  alert('Enter email and password');
  }
}


function createCookie(name,email){
  // today = new Date();
  // var expire = new Date();
  // expire.setTime(today.getTime() + 3600000*24*365);

  // document.cookie = "name="+name+";path=/" + ";expires="+expire.toUTCString();
  document.cookie = "name="+name+";path=/";
  // document.cookie = "email="+email+";path=/" + ";expires="+expire.toUTCString();
  document.cookie = "email="+email+";path=/";
}  


function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}