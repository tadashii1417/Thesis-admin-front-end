export function getDisplayName(user) {
    if (!user) {
        return "Unknown user";
    }

    const { firstName, lastName, username, email } = user;
    if (firstName && lastName) {
        return firstName + " " + lastName;
    }
    if (firstName) {
        return firstName;
    }
    if (lastName) {
        return lastName;
    }
    if (username) {
        return username;
    }

    return email;
}
