import axios from '../axios-config';

export async function removeFile(id) {
    return axios.delete('/api/files/' + id);
}