import moment from "moment";
import axios from '../config/axios-event';
import { queryStringFromObject } from "../utils/url_util";
import { EventType } from "../constants/event_constant";

export function getModuleEvents(date) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDayInMonth = new Date(y, m, 1);
    const lastDayInMonth = new Date(y, m + 1, 0);

    const mondayOfFirstDayInMonth = moment(firstDayInMonth).startOf("isoWeek");
    const sundayOfFirstDayInMonth = moment(lastDayInMonth).endOf("isoWeek");

    const query = {
        type: EventType.MODULE,
        startFrom: mondayOfFirstDayInMonth.valueOf(),
        startTo: sundayOfFirstDayInMonth.valueOf(),
        groupByDay: true
    };

    return axios.get(`/api/events?${queryStringFromObject(query)}`);
}