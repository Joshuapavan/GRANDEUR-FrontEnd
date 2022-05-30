var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

const vinaylinkedIn = document.querySelector('#vinayLI');
vinaylinkedIn.addEventListener('click', () => {
  window.open("https://www.linkedin.com/in/vinay-joshva15/");
})

const viveklinkedIn = document.querySelector('#vivekLI');
viveklinkedIn.addEventListener('click', () => {
  window.open("https://www.linkedin.com/in/vivek-kumar-438b3a1b9/");
})

const pavanlinkedIn = document.querySelector('#pavanLI');
pavanlinkedIn.addEventListener('click', () => {
  window.open("https://www.linkedin.com/in/pavan-kumar-g-906a/");
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
  window.location = 'http://127.0.0.1:5500/buy/buy.html';
}