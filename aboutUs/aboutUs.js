var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

const linkedIn = document.querySelector('#vinayLI');
linkedIn.addEventListener('click', (e) => {
  console.log(e);
  window.open("https://www.linkedin.com/in/vinay-joshva15/");
})