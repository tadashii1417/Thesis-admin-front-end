import {RoleType} from "../constants/role_constant";
import {UserType} from "../constants/user_contant";

export function checkIsAdmin(type) {
    return type === UserType.STAFF;
}

export function checkIsInstructor(roles) {
    for (let role of roles) {
        if (role.name === RoleType.INSTRUCTOR) {
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
