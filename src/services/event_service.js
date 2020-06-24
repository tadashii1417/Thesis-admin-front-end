import moment from "moment";
import axios from '../config/axios-event';
import { queryStringFromObject } from "../utils/url_util";

export function getModuleEvents(date) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDayInMonth = new Date(y, m, 1);
    const lastDayInMonth = new Date(y, m + 1, 0);

    const mondayOfFirstDayInMonth = moment(firstDayInMonth).startOf("isoWeek");
    const sundayOfFirstDayInMonth = moment(lastDayInMonth).endOf("isoWeek");

    const query = {
        from: mondayOfFirstDayInMonth.valueOf(),
        to: sundayOfFirstDayInMonth.valueOf()
    };

    return axios.get(`/api/events?${queryStringFromObject(query)}`);
}
