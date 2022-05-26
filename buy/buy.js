window.onload = function(){
    const localName = localStorage.getItem('name');
    const localEmail = localStorage.getItem('email');

    if((localName != 'undefined' && localEmail != 'undefined') || (localName != null && localEmail != null)){
        document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
    }
    if((localName == 'undefined' && localEmail == 'undefined') || (localName == null && localEmail == null)){
        document.getElementById('loginLabel').innerHTML = 'Login';
    }
}

    const getAllCarsApi = 'http://localhost:8090/api/v1/cars';
    fetch(getAllCarsApi)
    .then(function (response) {
        return response.json()
    })
    .then(function(data){
        console.log(data);
        console.log(data.length);

        let output = "";
        for(let car of data){
            output += `
            <section class="container"s>
            <div class="row">
            <div class="col">
            <img src="${car.imageURL}" class="img-fluid" alt="${car.name}">
            </div>
            <div class="col">
            <form action="#">

            
            <div>
            <label class="infoToBuyer">Owner: </label>
                <label for="buyer-name" id="buyer-name" class="car-info animated bounceIn" style="animation-delay: 0.1s">${car.sellerName}</label>
            </div>
            
            <div>
                <label for="" class="infoToBuyer">Brand: </label>
                <label for="car-name" id="car-details" class="car-info animated bounceIn" style="animation-delay: 0.2s">${car.brand}</label>
            </div>
            
            <div>
                <label for="" class="infoToBuyer">Model: </label>
                <label for="buyer-name" id="buyer-name" class="car-info animated bounceIn" style="animation-delay: 0.3s">${car.model} -(${car.year})</label>
            </div> 

            <div>
                <label for="" class="infoToBuyer">Price: </label>
                <label for="buyer-name" id="buyer-name" class="car-info animated bounceIn" style="animation-delay: 0.4s">${car.expectedPrice}/-</label>
            </div> 
    
            <div>
                <label for="" class="infoToBuyer"> Kilometers Driven: </label>
                <label for="buyer-name" id="buyer-name"  class="car-info animated bounceIn" style="animation-delay: 0.5s">${car.kms}</label>
            </div> 

            <div>
                <label for="" class="infoToBuyer"> No of Previous owners: </label>
                <label for="buyer-name" id="buyer-name"  class="car-info animated bounceIn" style="animation-delay: 0.6s">${car.ownerCount}</label>
            </div> 

            <div>
                <label for="" class="infoToBuyer"> Insurance Avaibility: </label>
                <label for="buyer-name" id="buyer-name"  class="car-info animated bounceIn" style="animation-delay: 0.7s">${car.insuranceAvailability}</label>
            </div> 

            <div>
                <label for="" class="infoToBuyer"> Damages: </label>
                <label for="buyer-name" id="buyer-name" class="car-info animated bounceIn" style="animation-delay: 0.8s">${car.damages}</label>
            </div> 

            <button type="submit" id="btn-buy" class="btn btn-success mt-4 animated lightSpeedIn" style="animation-delay: 2s">Buy</button>
            </form>
            </div>
        </div>
        <div id="carsDiv">
        </div>
        </section>
            `;
        }
        document.getElementById('carContainer').innerHTML = output;
    })


if(localStorage.getItem('search') != '' && localStorage.getItem('redirected') == 'true'){
    search(localStorage.getItem('search'));
    localStorage.setItem('redirected','false');
}

async function search(brandName){
    const searchApi = 'http://localhost:8090/api/v1/cars/search';
    const response = await fetch(searchApi,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify({ 
            "brand" : brandName
        })
    });

    if(response.status >= 200 && response.status < 300){
    const data = await response.json(); // array of JSON objects // 
    
    let output = "";
        for(let car of data){
            output += `
            <section class="container"s>
            <div class="row">
            <div class="col">
            <img src="${car.imageURL}" class="img-fluid" alt="${car.name}">
            </div>
            <div class="col">
            <form action="#">

            
            <div>
            <label class="infoToBuyer">Owner: </label>
                <label for="buyer-name" id="buyer-name" class="car-info animated bounceIn" style="animation-delay: 0.1s">${car.sellerName}</label>
            </div>
            
            <div>
                <label for="" class="infoToBuyer">Brand: </label>
                <label for="car-name" id="car-details" class="car-info animated bounceIn" style="animation-delay: 0.2s">${car.brand}</label>
            </div>
            
            <div>
                <label for="" class="infoToBuyer">Model: </label>
                <label for="buyer-name" id="buyer-name" class="car-info animated bounceIn" style="animation-delay: 0.3s">${car.model} -(${car.year})</label>
            </div> 

            <div>
                <label for="" class="infoToBuyer">Price: </label>
                <label for="buyer-name" id="buyer-name" class="car-info animated bounceIn" style="animation-delay: 0.4s">${car.expectedPrice}/-</label>
            </div> 
    
            <div>
                <label for="" class="infoToBuyer"> Kilometers Driven: </label>
                <label for="buyer-name" id="buyer-name"  class="car-info animated bounceIn" style="animation-delay: 0.5s">${car.kms}</label>
            </div> 

            <div>
                <label for="" class="infoToBuyer"> No of Previous owners: </label>
                <label for="buyer-name" id="buyer-name"  class="car-info animated bounceIn" style="animation-delay: 0.6s">${car.ownerCount}</label>
            </div> 

            <div>
                <label for="" class="infoToBuyer"> Insurance Avaibility: </label>
                <label for="buyer-name" id="buyer-name"  class="car-info animated bounceIn" style="animation-delay: 0.7s">${car.insuranceAvailability}</label>
            </div> 

            <div>
                <label for="" class="infoToBuyer"> Damages: </label>
                <label for="buyer-name" id="buyer-name" class="car-info animated bounceIn" style="animation-delay: 0.8s">${car.damages}</label>
            </div> 

            <button type="submit" id="btn-buy" class="btn btn-success mt-4 animated lightSpeedIn" style="animation-delay: 2s">Buy</button>
            </form>
            </div>
        </div>
        <div id="carsDiv">
        </div>
        </section>
            `;
        }
        document.getElementById('carContainer').innerHTML = output;
    }
    else if(data.length == 0){
        showAlert('No cars found');
    }
}

const searchBox = document.getElementById('search-input')
searchBox.addEventListener('keyup',() => {
    search(searchBox.value);
})
