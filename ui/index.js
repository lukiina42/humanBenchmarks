let menuBool = false;
const showMenu = document.querySelector("#showScores");
showMenu.addEventListener("click", showMenufunc);

const bruh = fetch("http://localhost:3000/users/3").then(response => response.json()).then(data => console.log(data.highScores)).catch(e => console.log(e))

function showMenufunc(e) {
menuBool = !menuBool;
if (menuBool) {
    document.body.classList.add("visible");
} else {
    document.body.classList.remove("visible");
}
}

/**
 * Callback when the browser connects to the internet
 */
const updateOnlineStatus = () => {
let connectionEl = document.getElementById("connection");

connectionEl.innerHTML = "ONLINE";
};

/**
 * Callback when the browser disconnects from the internet
 */
const updateOfflineStatus = () => {
let connectionEl = document.getElementById("connection");

connectionEl.innerHTML = "OFFLINE";
};

// add listeners to page
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOfflineStatus);

/**
 * Handle the page load
 */
window.addEventListener("load", () => {
if (navigator.onLine) {
    updateOnlineStatus();
} else {
    updateOfflineStatus();
}
});