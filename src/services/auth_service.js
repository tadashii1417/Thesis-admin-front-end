import axios from '../config/axios-config';

export async function fetchMe() {
    const {data} = await axios.get("/api/me");

    const {user, accessToken} = data;
    return {user, accessToken};
}

export async function login(email, password) {
    const body = {
        usernameOrEmail: email,
        password: password
    };

    const {data} = await axios.post("/api/auth/login", body);

    const {user, accessToken} = data;
    return {user, accessToken};
}