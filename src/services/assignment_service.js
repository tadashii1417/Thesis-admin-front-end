import axios from '../config/axios-config';

export function createAssignment(moduleId, values) {
    const {openAt, closeAt, intro, attachmentFiles} = values;

    const formData = new FormData();

    if (openAt) {
        formData.append('openAt', openAt);
    }
    if (closeAt) {
        formData.append('closeAt', closeAt);
    }

    formData.append('intro', intro);
    formData.append('moduleId', moduleId);

    if (attachmentFiles) {
        attachmentFiles.fileList.forEach(item => {
            formData.append('attachmentFiles', item.originFileObj);
        });
    }

    return axios.post('/api/assignments', formData);
}

export function updateAssignment(moduleId, patch) {
    return axios.patch('/api/assignments/' + moduleId, patch);
}

export function addAssignmentFile(id, files) {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('attachmentFiles', file.originFileObj);
    });

    return axios.post(`/api/assignments/${id}/attachments`, formData);
}

export function fetchSubmissions(id) {
    return axios.get(`/api/assignments/${id}/submissions`);
}