import axios from '../config/axios-config';
import {createPatch} from "../utils/patch_util";

export function createEnrollment(courseId, learnerUserId) {
    return axios.post('/api/enrollments', {courseId, learnerUserId});
}

export function updateEnrollment(enrollmentId, value) {
    const patch = [];
    createPatch(patch, 'status', value);
    return axios.patch(`/api/enrollments/${enrollmentId}`, patch);
}