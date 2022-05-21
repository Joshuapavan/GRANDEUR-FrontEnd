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




// random number to select car buttons // 
const randomNumber = function(){
  let rand = Math.floor(Math.random() * 2)
  return rand;
}



const slider = document.querySelector('#numberOf-owners');
slider.value = 0;
slider.addEventListener('change',function sliderChanged(){
  var count = slider.value;
  document.getElementById('ownerCount').innerHTML = "No. Of Owners ("+count+"/3)";

})

const insurance = document.querySelector('#insuranceAvailability');
insurance.addEventListener('change', function insuranceChecked(){
  if(insurance.checked == true){
    document.getElementById('insuranceLabel').innerHTML = "Insurance Available";
  }
  else if(insurance.checked == false){
    document.getElementById('insuranceLabel').innerHTML = "Insurance Not Available";
  }
})



// API call and data transfer method // 
async function sell() {
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

  let insurance;
  if(insuranceAvailability.checked == true) {
    insurance = true; 
  }else{
    insurance = false;
  }
  const damages = document.getElementById("damages").value;

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
        "damages" : damages
      }
    )
  })
  .catch(error =>{
    alert(error.message)
  })

  // extracting the data from the response promise // 
  var data = await response.text()

  if(response.status >= 200 && response.status < 300) {
  // do nothing // 
    alert('added a car!')
  }
  else if(response.status >= 400 && response.status < 500) {
    if(response.status === 404) {
      alert('Invalid Email, please sign up')
    }
    alert('error while adding the car, Please fill all details \n('+response.status+')')
  }
  else if(response.status >= 500 && response.status < 600){
    alert('Internal Server Error '+data.error+' '+response.status)
  }
}

async function postImages(){
  const file = document.getElementById('file');

  const sellerEmail=document.getElementById("seller-email").value;
  const imageApi = 'http://localhost:8090/api/v1/cars/'+sellerEmail+'/image1';

  const formData = new FormData();
  formData.append('image1',file.files[0]);

  const response = await fetch(imageApi,
    {
      method: 'POST',
      body: formData
    });

    var data = await response.json();
  
    alert(data);
    console.log(data);
  
  }


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




  // const image = document.getElementById('file');
  // const image = document.getElementById('file');
  // const image = document.getElementById('file');



  // var formData = new FormData();
  // formData.append('image1',image);
