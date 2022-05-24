var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

window.onload = function(){
  // const localName = localStorage.getItem('name');
  // const localEmail = localStorage.getItem('email');

  // if(localName != '' && localEmail != ''){
  //   document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
  // }
  // else{
  //   document.getElementById('loginLabel').innerHTML = 'Login';
  // }
  document.getElementById('loginLabel').innerHTML = "Josh";
}