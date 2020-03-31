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
    return sessionStorage.setItem(key, value);
}

export function localGetItem(key) {
    return sessionStorage.getItem(key);
}
