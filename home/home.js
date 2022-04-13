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