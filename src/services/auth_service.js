import axios from '../axios-config';

export async function fetchMe() {
    const {data} = await axios.get("/me");

    const {user, accessToken} = data;
    return {user, accessToken};
}

export async function login(email, password) {
    const body = {
        usernameOrEmail: email,
        password: password
    };

    const {data} = await axios.post("/auth/login", body);

    const {user, accessToken} = data;
    return {user, accessToken};
}