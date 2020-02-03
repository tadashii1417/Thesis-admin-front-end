import * as actionTypes from "../../constants/actions_constant";
import {updateObject} from "../utility";

const initialState = {
    token: null,
    userInfo: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        token: action.authData.accessToken,
        userInfo: action.authData.user,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error.message,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
};

export default reducer;
