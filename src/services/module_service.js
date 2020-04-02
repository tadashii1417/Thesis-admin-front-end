import axios from "../config/axios-config";

export async function createNewModule(values, modules, id) {
    const len = modules.length;
    let order = 0;
    if (len > 0) {
        order = modules[len - 1].order + 1
    }
    const body = {
        title: values.title,
        type: values.type,
        order: order
    };
    return axios.post('/api/sections/' + id + '/modules', body);
}


export async function getModule(moduleId) {
    return axios.get('/api/modules/' + moduleId);
}

export async function updateModule(id, patch) {
    return axios.patch('/api/modules/' + id, patch);
}

export async function deleteModule(id) {
    return axios.delete('/api/modules/' + id);
}