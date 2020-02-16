import moment from "moment";
import config from "../config";

export function createPatch(patch, key, value) {
    if (moment.isMoment(value)) {
        value = value.format(config.timeFormat);
    }

    const newPatch = {
        "op": "replace",
        "path": '/' + key,
        "value": value
    };

    patch.push(newPatch);
}