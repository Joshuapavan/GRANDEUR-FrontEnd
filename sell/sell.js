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
  const image = document.getElementById('file').files[0];
  var base64Image;

  var reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = function(){
    base64Image = reader.result;
  };
  reader.onerror = function(error){
    console.log(error.message); 
  }

  // const image = document.getElementById('file');
  // const image = document.getElementById('file');
  // const image = document.getElementById('file');

  const sellerEmail=document.getElementById("seller-email").value;
  const imageApi = 'http://localhost:8090/api/v1/cars/'+sellerEmail+'/image1';

  // var formData = new FormData();
  // formData.append('image1',image);

  const response = await fetch(imageApi,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        "image": base64Image
      }
    )
  })

  var data = await response.text();
  
  alert(data);



}

// function getBase64(file) {
//   var reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function () {
//     console.log(reader.result);
//     return reader.result;
//   };
//   reader.onerror = function (error) {
//     console.log('Error: ', error);
//   };
// }