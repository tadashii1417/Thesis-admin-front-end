import { ActionTypes } from "../../constants";
import {newAction} from "../../utils/action_util";

export function startLoadingApp() {
    return newAction(ActionTypes.START_LOADING_APP);
}

export function finishLoadingApp() {
    return newAction(ActionTypes.FINISH_LOADING_APP);
}
