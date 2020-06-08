import moment from "moment";

export function formatEventGroupKey(date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export function formatTimeFromNow(date) {
    return moment(date).fromNow();
}
