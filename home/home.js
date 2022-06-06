//event handler for page load - runs on every refresh
window.onload = function(){
  const localName = localStorage.getItem('name');
  const localEmail = localStorage.getItem('email');

  if((localName != 'undefined' && localEmail != 'undefined') || (localName != null && localEmail != null)){
    document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
  }
  if(localStorage.getItem('fromEmail') == 'true'){
    showAlert('Welcome, please Login to Verify.');
    // localStorage.setItem('fromEmail','false');
  }
  if((localName == 'undefined' && localEmail == 'undefined') || (localName == null && localEmail == null)){
    showAlert('Welcome, Please Login or SignUp');
    document.getElementById('loginLabel').innerHTML = 'Login';
  }else{
    showAlert('Welcome,'+localName);
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
  window.location = 'http://127.0.0.1:5501/buy/buy.html';
}

function showAlert(message){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    background : '#EE7600',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    title: '',
    text: message,
    color: '#000000',
  })
  }

// set interval //