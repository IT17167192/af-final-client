import React, {useState} from "react";
import {Link} from "react-router-dom";
import {isAuthenticate} from "../api_connection/ApiConnection";

const Sidebar = (props) => {

    const {user} = isAuthenticate();

    return (
        <nav className={props.toggler}>
            <div className="container-fluid d-flex flex-column p-0">
                <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink"></i></div>
                    <div className="sidebar-brand-text mx-3"><span>AF FINAL</span></div>
                </a>
                <hr className="sidebar-divider my-0" />
                    <ul className="nav navbar-nav text-light" id="accordionSidebar">
                        {user.role === "1" && <li className="nav-item" role="presentation">
                            <Link className={props.active === "adminDashboard" ? 'nav-link active' : 'nav-link'}
                                  to="/admin">
                                <i className="fas fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>}
                        <li className="nav-item" role="presentation">
                            <Link className={props.active==="addAppointment" ? 'nav-link active': 'nav-link'}
                                  to="/addAppointment">
                                <i className="far fa-calendar-check"></i>
                                <span>Add Appointment</span>
                            </Link>
                        </li>
                    </ul>
                <div className="text-center d-none d-md-inline">
                    <button className="btn rounded-circle border-0" id="sidebarToggle" onClick={props.toggleClass} type="button"></button>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;


