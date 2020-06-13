import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AdminDashboard from "./user/AdminDashboard";
import SignIn from "./user/SignIn";
import AddAppointment from "./user/AddAppointment";
import AdminRoute from "./auth/AdminRoute";
import UserRoute from "./auth/UserRoute";
import SignUp from "./user/SignUp";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <AdminRoute exact path="/admin" component={AdminDashboard} />
                <UserRoute exact path="/addAppointment" component={AddAppointment} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;
