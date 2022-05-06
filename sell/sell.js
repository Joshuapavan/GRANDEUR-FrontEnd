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


//main uploading 
function sell() {
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

  

  
  console.log(ownerCount);


  fetch("http://localhost:8090/api/v1/cars", {
       method: "POST",
      body: JSON.stringify(
        {
        "sellerName" : sellerName,
        "sellerEmail" : sellerEmail,
        "brand": brand,
        "number":number,
        "model":model,
        "carType":carType,
        "year":year,
        "kms":kms,
        "ownerCount":ownerCount,
        "expectedPrice":expectedPrice,
        "insuranceAvailability":insurance,
        "damages":damages
    }
    ),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 .then(response => response.json())
 .then(json => console.log());
}

// buttonClick.addEventListener("click", (firstName) => {
//   // e.preventDefault();
//   console.log(firstName.value);
// })