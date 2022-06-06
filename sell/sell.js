var popover = new bootstrap.Popover(document.querySelector('#contactus'), {
  trigger: 'focus'
});

window.onload = function(){
  const localName = localStorage.getItem('name');
  const localEmail = localStorage.getItem('email');
  
  if((localName != 'undefined' && localEmail != 'undefined') || (localName != null && localEmail != null)){
    document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
  }
  else if((localName == 'undefined' && localEmail == 'undefined') || (localName == null && localEmail == null)){
    document.getElementById('loginLabel').innerHTML = 'Login';
  }
}

const vintage = document.getElementById('vintageButton');
const luxury = document.getElementById('luxuryButton');
const image = document.getElementById('img');
const imageChange = document.getElementById('changeImage');

const sellerEmail=document.getElementById("seller-email").value;
const imageApi = 'http://localhost:8090/api/v1/cars/image1';

const cloudflairAPI = 'https://api.cloudinary.com/v1_1/do1xxh1r3/image/upload';
const cloudflairPreset = 'c0a3jkpf';
var imageURL;

const slider = document.getElementById('numberOf-owners');
slider.value = 1;

slider.addEventListener('change',function(){
  var count = slider.value;
  document.getElementById('ownerCount').innerHTML = "No. Of Owners ("+count+"/3)";
});

const insurance = document.getElementById('insuranceAvailability');
insurance.addEventListener('change', function insuranceChecked(){
  if(insurance.checked == true){
    document.getElementById('insuranceLabel').innerHTML = "Insurance Available";
  }
  if(insurance.checked == false){
    document.getElementById('insuranceLabel').innerHTML = "Insurance Not Available";
  }
});


const imageInput = document.getElementById('file');
imageInput.addEventListener('change',async function(event){

  event.preventDefault();

  const files = document.getElementById('file').files;
  const formData = new FormData();
  formData.append('file',files[0]);
  formData.append('upload_preset',cloudflairPreset);

  const response = await fetch(cloudflairAPI,{
  method: 'POST',
  body: formData
  })

  var data = await response.json();
  console.log(data);
  imageURL = data.secure_url;
});



const sellButton = document.getElementById('sell-button');
sellButton.addEventListener('click', async function(event){

  event.preventDefault();

  const sellerName=document.getElementById("seller-name").value;

  const sellerEmail=document.getElementById("seller-email").value;

  const brand=document.getElementById("car-brand").value;

  const number=document.getElementById("car-number").value;

  const model=document.getElementById("car-model").value;

  const carType = document.getElementById("car-type").value;

  const year = document.getElementById("year-of-manufacture").value;

  const kms = document.getElementById("kilometers-driven").value;

  const ownerCount = document.getElementById("numberOf-owners").value;

  const expectedPrice = document.getElementById("car-price").value;

  const insuranceAvailability = document.getElementById("insuranceAvailability");

  const damages = document.getElementById("damages").value;


  let insurance;

  if(insuranceAvailability.checked == true) {
    insurance = true; 
  }else{
    insurance = false;
  }

  if(imageURL == null || imageURL == ''){
    showAlert("Please upload image.")
  }
  else{
  const sellApi = 'http://localhost:8090/api/v1/cars/'+sellerEmail;
  const response = await fetch(sellApi, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        "sellerName" : sellerName,
        "sellerEmail" : sellerEmail,
        "brand" : brand,
        "number" : number,
        "model" : model,
        "carType" : carType,
        "year" : year,
        "kms" : kms,
        "ownerCount" : ownerCount,
        "expectedPrice" : expectedPrice,
        "insuranceAvailability" : insurance,
        "imageURL" : imageURL,
        "damages" : damages
      }
    )
  })
  .catch(error =>{
    // alert(error.message)
    showAlert(error.message);
  })

  // extracting the data from the response promise // 
  var data = await response.text();

  if(response.status >= 200 && response.status < 300) {
    showAlert('Car Added!');
  }
  else if(response.status >= 400 && response.status < 500) {
    if(response.status == 404) {
      // alert('Invalid Email, please sign up')
      showAlert('Invalid Email, please sign up');
    }
    else{
    // alert('error while adding the car, Please fill all details \n('+response.status+')')
    showAlert('error while adding the car, Please fill all details \n('+response.status+')');
    }

  }
  else if(response.status >= 500 && response.status < 600){
    // alert('Internal Server Error '+data.error+' '+response.status)
    showAlert('Internal Server Error '+data.error+' '+response.status);
  }
}
});

document.getElementById('reset-button').addEventListener('click', function(){
  const sellerName=document.getElementById("seller-name");
  sellerName.value = "";
  const sellerEmail=document.getElementById("seller-email");
  sellerEmail.value = "";
  const brand=document.getElementById("car-brand");
  brand.value = "";
  const number=document.getElementById("car-number");
  number.value = "";
  const model=document.getElementById("car-model");
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
searchBar.onchange = ()=>{
  localStorage.setItem('search',searchBar.value);
  localStorage.setItem('redirected','true');
  window.location = 'http://127.0.0.1:5501/buy/buy.html';
}


function showAlert(message){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
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
    color: '#000000'
  })
  }