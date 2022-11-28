document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault()

    const password = document.getElementById("passwordField").value
    const username = document.getElementById("usernameField").value

    const loginRequest = {
        username,
        password
    }

    console.log(loginRequest)
})