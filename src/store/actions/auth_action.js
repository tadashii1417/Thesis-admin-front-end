import {ActionTypes} from '../../constants';
import {newAction} from "../../utils/action_util";
import {clearToken, setToken} from "../../utils/storage_util";
import {login, fetchMe} from "../../services/auth_service";
import {isAdmin} from "../../utils/permision_util";


export function getMe() {
    return async function (dispatch) {
        try {
            const {user, accessToken} = await fetchMe();
            const {roles} = user;

            if (isAdmin(roles)) {
                setToken(accessToken);
                dispatch(newAction(ActionTypes.GET_ME_SUCCESS, user));
            } else {
                dispatch(newAction(ActionTypes.GET_ME_FAILURE))
            }
        } catch (e) {
            dispatch(newAction(ActionTypes.GET_ME_FAILURE));
        }
    };
}

export function loginUser(email, password) {
    return async function (dispatch) {
        const {user, accessToken} = await login(email, password);
        const {roles} = user;

        if (isAdmin(roles)) {
            setToken(accessToken);
            dispatch(newAction(ActionTypes.LOGIN, user));
        } else {
            throw Error("Not admin");
        }
    };
}

export function logoutUser() {
    clearToken();
    return newAction(ActionTypes.LOGOUT);
}
