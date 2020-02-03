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

    customHandler();
}
