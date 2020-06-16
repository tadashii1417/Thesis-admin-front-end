import axios from '../config/axios-config';

export function getRoles() {
    return axios.get('/api/roles');
}

export function getSpecificRole(roleId) {
    return axios.get('/api/roles/' + roleId);
}

export function createRole(values) {
    return axios.post('/api/roles', values);
}

export function updateRole(roleId, patch) {
    return axios.patch(`/api/roles/${roleId}`, patch);
}

export function deleteRole(roleId) {
    return axios.delete('/api/roles/' + roleId);
}

export function addPermissionToRole(roleId, permissionId) {
    return axios.post(`/api/roles/${roleId}/permissions/${permissionId}`);
}

export function deletePermissionFromRole(roleId, permissionId) {
    return axios.delete(`/api/roles/${roleId}/permissions/${permissionId}`);
}

export function getPermissions() {
    return axios.get('/api/permissions');
}

export function addRoleToUser(userId, roleId) {
    return axios.post(`/api/roles/${roleId}/users/${userId}`);
}
