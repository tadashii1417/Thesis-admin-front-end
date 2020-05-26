import {message} from "antd";

export function httpErrorHandler(error, customHandler) {
    if (!error.status) {
        message.error("No internet connection");
        return;
    }

    if (error.status === 500) {
        message.error("Internal server error");
        return;
    }

    if (error.status === 403) {
        message.error("Your are not allowed to do this action !");
        return;
    }

    if (error.status === 413) {
        message.error("Content size is too large ! Please replace with smaller one.");
        return;
    }
    customHandler();
}
