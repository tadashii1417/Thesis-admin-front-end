import moment from "moment";
import config from "../config";

export function formatEventGroupKey(date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export function formatTimeFromNow(date) {
    return moment(date).fromNow();
}

String.prototype.toSentenceCase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

export function formatCalendarTime(date) {
    return moment(date)
        .calendar()
        .toSentenceCase();
}

export function displayDateTime(data) {
    return moment(data, config.timeFormat).format('HH:mm:ss DD/MM/YYYY')
}
