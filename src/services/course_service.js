import axios from '../config/axios-config';


export async function createCourse(values) {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('slug', values.slug);
    formData.append('type', values.type);
    formData.append('price', values.price);
    formData.append('listPrice', values.listPrice);
    formData.append('description', values.description);
    formData.append('requirements', values.requirements);

    values.learningOutcomes.forEach(item => {
        if (item != null) {
            formData.append('learningOutcomes[]', item);
        }
    });

    if (values.banner) {
        formData.append('banner', values.banner.file.originFileObj);
    }

    formData.append('visibility', values.visibility);
    return axios.post('/api/courses', formData);
}

export async function updateCourse(id, patch) {
    return axios.patch('/api/courses/' + id, patch);
}

export async function updateCourseBanner(id, file) {
    const formData = new FormData();

    formData.append('banner', file);
    return axios.patch('/api/courses/' + id + '/banner', formData);
}

export function getCourseEnrollments(courseId) {
    return axios.get(`/api/courses/${courseId}/enrollments`);
}