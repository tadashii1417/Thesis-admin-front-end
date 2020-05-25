import qs from "query-string";

export function queryStringFromObject(o) {
    return qs.stringify(o);
}