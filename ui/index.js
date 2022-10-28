let menuBool = false;
const showMenu = document.querySelector("#showScores");
showMenu.addEventListener("click", showMenufunc);

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