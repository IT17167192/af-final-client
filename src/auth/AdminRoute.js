import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import { isAuthenticate } from "../api_connection/ApiConnection";

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuthenticate() && parseInt(isAuthenticate().user.role) === 1  ? (
        <Component {...props} />
    ) : (
        <Redirect to={{pathname: '/', state: {from: props.location}}} />
    )}/>
);

export default AdminRoute;
