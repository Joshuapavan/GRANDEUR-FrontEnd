var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

const linkedIn = document.querySelector('#vinayLI');
linkedIn.addEventListener('click', (e) => {
  console.log(e);
  window.open("https://www.linkedin.com/in/vinay-joshva15/");
})

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