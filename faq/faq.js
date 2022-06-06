var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

window.onload = function(){
  const localName = localStorage.getItem('name');
  const localEmail = localStorage.getItem('email');

  if((localName != 'undefined' && localEmail != 'undefined') || (localName != null && localEmail != null)){
    document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
  }
  if((localName == 'undefined' && localEmail == 'undefined') || (localName == null && localEmail == null)){
    document.getElementById('loginLabel').innerHTML = 'Login';
  }
}

const searchBar = document.getElementById('search-input');

searchBar.onchange = ()=>{
  localStorage.setItem('search',searchBar.value);
  localStorage.setItem('redirected','true');
  window.location = 'http://127.0.0.1:5501/buy/buy.html';
}