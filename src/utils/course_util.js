import {WeekdaysMapping} from "../constants/weekdays_contant";

export function convertNumbersToWeekday(numbers) {
    let res = [];
    if (!numbers) return res;
    numbers.forEach(num => res.push(WeekdaysMapping[num]));
    return res;
}
