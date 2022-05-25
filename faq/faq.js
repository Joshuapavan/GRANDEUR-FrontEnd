var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

window.onload = function(){
  const localName = localStorage.getItem('name');
  const localEmail = localStorage.getItem('email');

  if(localName != 'undefined' && localEmail != 'undefined'){
    document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
  }
  if(localStorage.getItem('name') == 'undefined'){
    document.getElementById('loginLabel').innerHTML = 'Login';
  }
}

const searchBar = document.getElementById('search-input');

searchBar.onchange = ()=>{
  localStorage.setItem('search',searchBar.value);
  localStorage.setItem('redirected','true');
  window.location = 'http://127.0.0.1:5500/buy/buy.html';
}