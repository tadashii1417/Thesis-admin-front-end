import {NumberToWeekday, WeekdayToNumber} from "../constants/weekdays_contant";

export function convertNumbersToWeekday(numbers) {
    const res = [];
    if (!numbers) return res;
    numbers.forEach(num => res.push(NumberToWeekday[num]));
    return res;
}

export function convertWeekdaysToNumbers(weekdays) {
    const res = [];
    if (!weekdays) return res;
    weekdays.forEach(num => res.push(WeekdayToNumber[num]));
    return res;
}
