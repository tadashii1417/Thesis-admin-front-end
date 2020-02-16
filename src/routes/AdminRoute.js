import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AdminRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <>
                        <Component {...props} />
                    </>
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
}