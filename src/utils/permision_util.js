export function isAdmin(roles) {
    for (let role of roles){
        if (role.name === "admin"){
            return true
        }
    }
    return false
}