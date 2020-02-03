import {ActionTypes} from "../../constants";

const initialState = {
    isAuthenticated: undefined,
    user: undefined,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN:
        case ActionTypes.GET_ME_SUCCESS:
            return {...state, isAuthenticated: true, user: action.payload};

        case ActionTypes.LOGOUT:
        case ActionTypes.GET_ME_FAILURE:
            return {...state, isAuthenticated: false, user: undefined};

        default:
            return state;
    }
}
