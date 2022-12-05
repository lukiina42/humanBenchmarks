
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

(function initHeader(){
    const registerButton = document.getElementById("firstHeader")
    const loginLogoutButton = document.getElementById("secondHeader")
    
    if(userInfo){
        registerButton.style.display = 'none'
        loginLogoutButton.innerHTML = "Logout"
    }
    
    loginLogoutButton.addEventListener("click", () => {
        if(loginLogoutButton.innerHTML === "Logout"){
            localStorage.removeItem("userInfo")
            loginLogoutButton.innerHTML = "Login"
            registerButton.style.display = 'inline-block'
        }else{
            window.location.href='login/login.html'
        }
    })
})();

(function initShowScores(){
    const showMenu = document.querySelector("#showScores");
    if(!userInfo){
        showMenu.style.display = 'none'
        return
    }
    document.getElementById("aimScore").innerHTML = userInfo.highScores?.aimTrainer ? `${userInfo.highScores.aimTrainer} ms` : "No data"
    document.getElementById("verbalScore").innerHTML = userInfo.highScores?.verbalMemory ? userInfo.highScores.verbalMemory : "No data"
    document.getElementById("numberScore").innerHTML = userInfo.highScores?.numberMemory ? userInfo.highScores.numberMemory : "No data"
    
    let menuBool = false;
    showMenu.addEventListener("click", showMenufunc);
    
    function showMenufunc(e) {
        menuBool = !menuBool;
        menuBool ? document.body.classList.add("visible") : document.body.classList.remove("visible")
    }
})()