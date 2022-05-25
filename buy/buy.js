window.onload = function(){
    const localName = localStorage.getItem('name');
    const localEmail = localStorage.getItem('email');

    if(localName != 'undefined' && localEmail != 'undefined'){
        document.getElementById('loginLabel').innerHTML = localStorage.getItem('name');
    }
    if(localStorage.getItem('name') == 'undefined'){
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
            <div class="car">
                <img src="${car.imageURL}" alt="${car.name}" />
                <p class = "title">${car.brand}</p>
                <p class = "description">${car.model}</p>
                <p class = "price">${car.expectedPrice}</p>
            </div>
            `;
        }
        // document.getElementById('carsDiv').innerHTML = output;
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
    console.log(data);
    }
    else{
        console.log(response.status);
    }
}

const searchBox = document.getElementById('search-input')
searchBox.addEventListener('keyup',() => {
    search(searchBox.value);
})
