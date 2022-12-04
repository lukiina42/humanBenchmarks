
(function init(){
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const registerButton = document.getElementById("firstHeader")
    const loginLogoutButton = document.getElementById("secondHeader")
    
    if(userInfo){
        registerButton.style.display = 'none'
        loginLogoutButton.innerHTML = "Logout"
    }else{
        showMenu.style.display = 'none'
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
    let menuBool = false;
    showMenu.addEventListener("click", showMenufunc);
    
    function showMenufunc(e) {
        menuBool = !menuBool;
        menuBool ? document.body.classList.add("visible") : document.body.classList.remove("visible")
    }
})()