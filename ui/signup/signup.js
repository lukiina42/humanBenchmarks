
(function init(){
    document.querySelectorAll(".formInput").forEach(input => {
        input.addEventListener("change", (() => validateInputs()))
        input.addEventListener("focus", (e) => {
            switch(e.target.id){
                case "usernameField":
                    usernameTouched = true
                    break
                case "passwordAgainField":
                    passwordAgainTouched = true
                    break
                case "passwordField":
                    passwordTouched = true
                    break
            }
        })
    })
})()

let usernameTouched = false
let passwordTouched = false
let passwordAgainTouched = false

const validateInputs = (isSubmit) => {
    const password = document.getElementById("passwordField")
    const username = document.getElementById("usernameField")
    const passwordAgain = document.getElementById("passwordAgainField")

    const passwordError = document.getElementById("passwordError")
    const usernameError = document.getElementById("usernameError")
    const passwordAgainError = document.getElementById("passwordAgainError")

    let allCorrect = true
    if(passwordTouched || isSubmit){
        if(!password.value){
            password.classList.add("invalid")
            passwordError.innerHTML = "Password should be filled"
            allCorrect = false
        } else if(password.value.length < 8) {
            password.classList.add("invalid")
            passwordError.innerHTML = "Password should have more than 8 characters"
            allCorrect = false
        } else {
            password.classList.remove("invalid")
            passwordError.innerHTML = ""
        }
    }
    if(usernameTouched || isSubmit){
        if(!username.value){
            username.classList.add("invalid")
            usernameError.innerHTML = "Username should be filled"
            allCorrect = false
        } else {
            usernameError.innerHTML = ""
            username.classList.remove("invalid")
        }
    }
    if(passwordAgainTouched || isSubmit){
        if(passwordAgain.value !== password.value){
            passwordAgain.classList.add("invalid")
            passwordAgainError.innerHTML = "Passwords don't match"
            allCorrect = false
        } else {
            passwordAgain.classList.remove("invalid")
            passwordAgainError.innerHTML = ""
        }
    }

    return allCorrect
    
}

document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault()

    if(!validateInputs(true)){
        return
    }

    const password = document.getElementById("passwordField").value
    const username = document.getElementById("usernameField").value
    const passwordAgain = document.getElementById("passwordAgainField").value

    const signupRequest = {
        username,
        password,
        passwordAgain
    }

    console.log(signupRequest)
})