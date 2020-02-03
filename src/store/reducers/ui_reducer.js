import { ActionTypes } from "../../constants";

const initialState = {
    isAppLoading: undefined
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_LOADING_APP:
            return { ...state, isAppLoading: true };

        case ActionTypes.FINISH_LOADING_APP:
            return { ...state, isAppLoading: false };

        default:
            return state;
    }
}
