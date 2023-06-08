var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
});

window.onload = function() {
  const localName = localStorage.getItem('name');
  const localEmail = localStorage.getItem('email');
  
  if ((localName != 'undefined' && localEmail != 'undefined') || (localName != null && localEmail != null)) {
    document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
  } else if ((localName == 'undefined' && localEmail == 'undefined') || (localName == null && localEmail == null)) {
    document.getElementById('loginLabel').innerHTML = 'Login';
  }
}

const vintage = document.getElementById('vintageButton');
const luxury = document.getElementById('luxuryButton');
const image = document.getElementById('img');
const imageChange = document.getElementById('changeImage');

const sellerEmail = document.getElementById("seller-email").value;
const apiUrl = 'http://localhost:3000/cars/new';

const slider = document.getElementById('numberOf-owners');
slider.value = 1;

slider.addEventListener('change', function() {
  var count = slider.value;
  document.getElementById('ownerCount').innerHTML = "No. Of Owners (" + count + "/3)";
});

const insurance = document.getElementById('insuranceAvailability');
insurance.addEventListener('change', function insuranceChecked() {
  if (insurance.checked == true) {
    document.getElementById('insuranceLabel').innerHTML = "Insurance Available";
  }
  if (insurance.checked == false) {
    document.getElementById('insuranceLabel').innerHTML = "Insurance Not Available";
  }
});

const imageInput = document.getElementById('file');
imageInput.addEventListener('change', async function(event) {
  event.preventDefault();

  const files = document.getElementById('file').files;
  const formData = new FormData();
  formData.append('file', files[0]);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData
  });

  var data = await response.json();
  console.log(data);
});

const sellButton = document.getElementById('sell-button');
sellButton.addEventListener('click', async function(event) {
  event.preventDefault();

  const sellerName = document.getElementById("seller-name").value;
  const sellerEmail = document.getElementById("seller-email").value;
  const brand = document.getElementById("car-brand").value;
  const number = document.getElementById("car-number").value;
  const model = document.getElementById("car-model").value;
  const carType = document.getElementById("car-type").value;
  const year = document.getElementById("year-of-manufacture").value;
  const kms = document.getElementById("kilometers-driven").value;
  const ownerCount = document.getElementById("numberOf-owners").value;
  const expectedPrice = document.getElementById("car-price").value;
  const insuranceAvailability = document.getElementById("insuranceAvailability");
  const damages = document.getElementById("damages").value;

  let insurance;

  if (insuranceAvailability.checked == true) {
    insurance = true;
  } else {
    insurance = false;
  }

  const formData = new FormData();
  formData.append('name', sellerName);
  formData.append('email', sellerEmail);
  formData.append('brand', brand);
  formData.append('model', model);
  formData.append('car_number', number);
  formData.append('year_of_manufacture', year);
  formData.append('kms_driven', kms);
  formData.append('price', expectedPrice);
  formData.append('any_damages', damages);
  formData.append('type_of_car', carType);
  formData.append('no_of_owners', ownerCount);
  formData.append('insured', insurance);
  formData.append('image', document.getElementById('file').files[0]);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    showAlert('Car Added!');
  } else {
    const errorMessage = await response.message;
    showAlert(`Error: ${errorMessage}`);
  }
});

document.getElementById('reset-button').addEventListener('click', function() {
  const sellerName = document.getElementById("seller-name");
  sellerName.value = "";
  const sellerEmail = document.getElementById("seller-email");
  sellerEmail.value = "";
  const brand = document.getElementById("car-brand");
  brand.value = "";
  const number = document.getElementById("car-number");
  number.value = "";
  const model = document.getElementById("car-model");
  model.value = "";
  const carType = document.getElementById("car-type");
  carType.value = "";
  const year = document.getElementById("year-of-manufacture");
  year.value = "";
  const kms = document.getElementById("kilometers-driven");
  kms.value = "";
  const ownerCount = document.getElementById("numberOf-owners");
  ownerCount = "";
  const expectedPrice = document.getElementById("car-price");
  expectedPrice.value = "";
});

const searchBar = document.getElementById('search-input');
searchBar.onchange = () => {
  localStorage.setItem('search', searchBar.value);
  localStorage.setItem('redirected', 'true');
  window.location = 'http://127.0.0.1:5501/buy/buy.html';
}

function showAlert(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    background: '#EE7600',
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
    color: '#000000'
  });
}
