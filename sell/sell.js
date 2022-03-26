var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
})

const vintage = document.querySelector('#vintageButton');
const luxury = document.querySelector('#luxuryButton');
const image = document.querySelector('img');
const imageChange = document.querySelector('#changeImage');
const baseUrl = '/images/vintage';
const baseUrl2 = '/images/luxury';

vintage.addEventListener('click', function() {
  const newIndex = randomIndex();
  image.src = `${baseUrl}${newIndex}.jpg`;
  image.append(imageChange);
})

luxury.addEventListener('click', function() {
  const indexNew = randomIndex2();
  image.src = `${baseUrl2}${indexNew}.jpg`;
  image.append(imageChange);
})

const randomIndex = function() {
  let rand = Math.floor(Math.random() * 7);
  return rand;
}
const randomIndex2 = function() {
  let rand = Math.floor(Math.random() * 11);
  return rand;
}