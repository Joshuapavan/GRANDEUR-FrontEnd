//event handler for page load - runs on every refresh
window.onload = function(){
  const localName = localStorage.getItem('name');
  const localEmail = localStorage.getItem('email');

  if(localName != '' && localEmail != ''){
    document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
  }
  else{
    document.getElementById('loginLabel').innerHTML = 'Login';
  }
}

var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

const account = document.querySelector('#account-click');

account.addEventListener('click', () => {
  window.location.href = '/Grandeur-FrontEnd/home/home.html';
})

const searchBar = document.getElementById('search-input');

searchBar.onchange = ()=>{
  localStorage.setItem('search',searchBar.value);
  localStorage.setItem('redirected','true');
  window.location = 'http://127.0.0.1:5500/buy/buy.html';
}


// set interval //