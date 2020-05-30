import axios from '../config/axios-config';

export function addCourseInstructor(courseId, instructorId) {
    return axios.post(`/api/courses/${courseId}/instructors/${instructorId}`);
}

export function removeCourseInstructor(courseId, instructorId) {
    return axios.delete(`/api/courses/${courseId}/instructors/${instructorId}`);
}


