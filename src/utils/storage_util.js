export function setToken(token) {
    localStorage.setItem("x-access-token", token);
}

export function getToken() {
    return localStorage.getItem("x-access-token") || "";
}

export function clearToken() {
    localStorage.removeItem("x-access-token");
}

export function localSetItem(key, value) {
    return localStorage.setItem(key, value);
}

export function localGetItem(key) {
    return localStorage.getItem(key);
}
