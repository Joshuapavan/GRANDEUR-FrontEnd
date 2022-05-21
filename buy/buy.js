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