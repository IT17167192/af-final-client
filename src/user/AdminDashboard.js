import React, {useState} from "react";
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/fonts/fontawesome-all.min.css';
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

const AdminDashboard = () => {

    const [toggler, setToggler] = useState('navbar navbar-dark align-items-start' +
        ' sidebar sidebar-dark accordion bg-gradient-primary p-0');

    const toggleClass = (e) => {
        if(toggler === 'navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0'){
            setToggler('navbar navbar-dark align-items-start sidebar toggled sidebar-dark accordion bg-gradient-primary p-0')
        }else{
            setToggler('navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0');
        }
    };

    const collapseClass = () => {
        if(toggler === 'navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0'){
            setToggler('navbar navbar-dark align-items-start sidebar toggled sidebar-dark accordion bg-gradient-primary p-0')
        }else{
            setToggler('navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0');
        }
    };

    return (
        <div id="page-top">
            <div id="wrapper">
                <Sidebar active="adminDashboard" toggler={toggler} toggleClass={toggleClass} />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <Header collapseClass={collapseClass}/>
                        <Content/>
                    </div>
                    <Footer />
                </div>
                <a className="border rounded d-inline scroll-to-top" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </div>
        </div>
    );
};

export default AdminDashboard;
