const toast = document.getElementsByClassName("errorToast")[0]
toast.addEventListener("click", (e) => toast.classList.remove("visible"))

document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault()

    const password = document.getElementById("passwordField").value
    const username = document.getElementById("usernameField").value

    const loginRequest = {
        username,
        password
    }

    fetch("http://localhost:3000/auth/login", 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        }
    )
    .then(response => {
        console.log(response)
        if(response.status !== 201) throw new Error()
        return response.json()
    })
    .then(payload => {
        if(payload.access_token){
            console.log(payload.access_token)
            localStorage.setItem("token", payload.access_token)
            window.location.href = "../index.html"
        }else {
            throw new Error("Something went wrong")
        }
    })
    .catch(error => {
        console.log(error)
        toast.classList.add("visible")
        window.setTimeout(() => toast.classList.remove("visible"), 10000)
            }
        )
    }
)