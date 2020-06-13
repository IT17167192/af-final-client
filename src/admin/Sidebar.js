import React, {useState} from "react";
import {Link} from "react-router-dom";

const Sidebar = (props) => {

    return (
        <nav className={props.toggler}>
            <div className="container-fluid d-flex flex-column p-0">
                <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink"></i></div>
                    <div className="sidebar-brand-text mx-3"><span>AF FINAL</span></div>
                </a>
                <hr className="sidebar-divider my-0" />
                    <ul className="nav navbar-nav text-light" id="accordionSidebar">
                        <li className="nav-item" role="presentation">
                            <Link className={props.active==="dashboard" ? 'nav-link active': 'nav-link'}
                                  to="/admin">
                                <i className="fas fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link className={props.active==="rawPage" ? 'nav-link active': 'nav-link'}
                                  to="/rawPage">
                                <i className="fas fa-pager"></i>
                                <span>Raw Page</span>
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


