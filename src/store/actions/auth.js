import * as actionTypes from '../../constants/actions_constant';
import axios from '../../axios-config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            usernameOrEmail: username,
            password: password
        };
        axios.post("/auth/login", authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(authFail(err.response.data.error));
            });
    }
};