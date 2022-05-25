var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

const linkedIn = document.querySelector('#vinayLI');
linkedIn.addEventListener('click', (e) => {
  window.open("https://www.linkedin.com/in/vinay-joshva15/");
})

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