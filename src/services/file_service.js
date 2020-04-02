import axios from '../config/axios-config';

export async function removeFile(id) {
    return axios.delete('/api/files/' + id);
}