export function setToken(token) {
    sessionStorage.setItem("x-access-token", token);
}

export function getToken() {
    return sessionStorage.getItem("x-access-token") || "";
}

export function clearToken() {
    sessionStorage.removeItem("x-access-token");
}

export function localSetItem(key, value) {
    return localStorage.setItem(key, value);
}

export function localGetItem(key) {
    return localStorage.getItem(key);
}
