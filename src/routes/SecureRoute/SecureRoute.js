import React from "react";
import {Route, Redirect} from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function SecureRoute({component: Component, isAuthenticated, user, allowed, ...rest}) {
    if (!isAuthenticated) return <Redirect to={"/login"}/>

    return (
        <Route {...rest} render={props => {
            if (!allowed.includes(user.roles[0].name)) return <Redirect to={"/unauthorized"}/>
            return (
                <React.Suspense fallback={Loading("large")}>
                    <Component {...props} />
                </React.Suspense>
            )
        }}/>
    );
}
