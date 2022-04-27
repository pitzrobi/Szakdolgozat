var backendUrl = "http://localhost:8080";

function getAuthToken() {
    const token = localStorage.getItem("jwt");
    return token;
}