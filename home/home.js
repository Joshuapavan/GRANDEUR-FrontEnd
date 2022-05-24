var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})



// var popover = new bootstrap.Popover(document.querySelector('#account-click'), {
//   trigger: 'focus'
// })
const account = document.querySelector('#account-click');

account.addEventListener('click', () => {
  // preventDefault();
  window.location.href = '/Grandeur-FrontEnd/home/home.html';
})


const accountDiv = document.querySelector('#accountDiv');
// accountDiv.addEventListener('mouseover', () =>{
//   accountDiv.style.backgroundColor = #2d6a4f;
// })


function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}

//event handler for page load - runs on every refresh
window.onload = function(){
  let cookie = {};
  document.cookie.split(';').forEach(function(temp) {
  let [key,value] = temp.split('=');
  cookie[key.trim()] = value;
  })
  const loginDiv = document.getElementById('loginLabel').innerHTML = cookie.name;
  if(cookie == ''){
  loginDiv.innerHTML = "Login";
  }
}


// set interval //