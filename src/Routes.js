import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignIn from "./user/SignIn";
import Dashboard from "./admin/Dashboard";
import RawPage from "./admin/RawPage";
import Home from "./home/Home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={Dashboard} />
                <Route exact path="/rawPage" component={RawPage} />
                <Route exact path="/signIn" component={SignIn} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;
