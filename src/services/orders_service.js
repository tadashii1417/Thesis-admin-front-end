import axios from "../config/axios-config";
import {DEFAULT_PAGE_SIZE} from "../constants/dev_constant";

export function getOrders(page, pageSize = DEFAULT_PAGE_SIZE) {
    return axios.get(`/api/orders?page=${page}&pageSize=${pageSize}`);
}
