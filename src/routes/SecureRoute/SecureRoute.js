import React from "react";
import {Route, Redirect} from "react-router-dom";

export default function SecureRoute({component: Component, isAuthenticated, user, allowed, ...rest}) {
    if (!isAuthenticated) return <Redirect to={"/login"}/>

    return (
        <Route {...rest} render={props => {
            if (!allowed.includes(user.roles[0].name)) return <Redirect to={"/unauthorized"}/>
            return <Component {...props} />
        }}/>
    );
}
