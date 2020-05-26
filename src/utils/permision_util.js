import {RoleType} from "../constants/role_constant";

export function checkIsAdmin(roles) {
    for (let role of roles) {
        if (role.name === RoleType.ADMIN) {
            return true
        }
    }
    return false
}

export function checkAccessibility(roles) {
    for (let role of roles) {
        if (role.name === RoleType.ADMIN || role.name === RoleType.INSTRUCTOR) {
            return true
        }
    }
    return false
}