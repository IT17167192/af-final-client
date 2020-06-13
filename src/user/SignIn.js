import React, {useState} from "react";
import backgroundImage from './assets/img/medical/pic2.jpg';
import {signin, authenticate, isAuthenticate} from "../api_connection/ApiConnection";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";

const SignIn = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirect: false
    });

    const {email, password, loading, error, redirect} = values;
    const {user} = isAuthenticate();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});

        signin({email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, () => {
                            setValues({...values, redirect: true})
                        }
                    );
                }
            })
    };

    const showError = () => (
        <div className="alert alert-danger text-center" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)
    );

    const redirectUser = () => {
        if (redirect) {
            if (user && user.role === "1") {
                return <Redirect to="/admin"/>
            } else {
                return <Redirect to="/addAppointment"/>
            }
        }

        if (isAuthenticate()) {
            if (user && user.role === "1") {
                return <Redirect to="/admin"/>
            } else {
                return <Redirect to="/addAppointment"/>
            }
        }
    };

    const signInForm = () => (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="flex-grow-1 bg-login-image"
                                         style={{backgroundImage: `url(${backgroundImage})`}}></div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h4 className="text-dark mb-4">Welcome Back!</h4>
                                        </div>
                                        <form className="user">
                                            <div className="form-group"><input
                                                className="form-control form-control-user" type="email"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..." name="email"
                                                onChange={handleChange('email')} value={email} /></div>
                                            <div className="form-group"><input
                                                className="form-control form-control-user" type="password"
                                                id="exampleInputPassword" placeholder="Password" name="password"
                                                onChange={handleChange('password')} value={password}/></div>

                                            {showLoading()}
                                            {showError()}
                                            <button className="btn btn-primary btn-block text-white btn-user"
                                                    type="submit" disabled={values.loading} onClick={clickSubmit}>Login
                                            </button>
                                            <hr/><a className="btn btn-primary btn-block text-white btn-google btn-user"
                                                    role="button"><i className="fab fa-google"></i>&nbsp; Login with
                                            Google</a><a
                                            className="btn btn-primary btn-block text-white btn-facebook btn-user"
                                            role="button"><i className="fab fa-facebook-f"></i>&nbsp; Login with
                                            Facebook</a>
                                            <hr/>
                                        </form>
                                        <div className="text-center"><a className="small" href="#">Forgot
                                            Password?</a></div>
                                        <div className="text-center">
                                            <Link className="small"
                                                  to="/signup">
                                                Create an Account!
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {signInForm()}
            {redirectUser()}
        </div>
    );
};

export default SignIn;
