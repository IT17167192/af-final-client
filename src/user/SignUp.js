import React, {useState} from "react";
import backgroundImage from './assets/img/medical/pic1.jpg'
import {Link} from "react-router-dom";
import {signup} from "../api_connection/ApiConnection";

const SignUp = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        conPassword: '',
        error: '',
        success: false
    });

    const {name, email, password, conPassword, success, error} = values;

    const showError = () => (
        <div className="alert alert-danger text-center" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New User Added Successfully <a href="/">Login</a>
        </div>
    );

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        if(password === conPassword){
            signup({name, email, password})
                .then(data => {
                    if (data.error) {
                        setValues({...values, error: data.error, success: false});
                    } else {
                        setValues({...values, name: '', email: '', password: '', error: '', success: true});
                    }
                });
        }else{
            setValues({...values, error: "Passwords doesn't match!", success: false})
        }
    };

    const signUpForm = () => (
        <div className="container">
            <div className="card shadow-lg o-hidden border-0 my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-flex">
                            <div className="flex-grow-1 bg-register-image"
                                 style={{backgroundImage: `url(${backgroundImage})`}}></div>
                        </div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">Create an Account!</h4>
                                </div>
                                <form className="user">
                                    <div className="form-group ">
                                        <input
                                            className="form-control form-control-user" type="text" id="exampleFirstName"
                                            placeholder="First Name" name="first_name"
                                            onChange={handleChange('name')} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control form-control-user"
                                           type="email" id="exampleInputEmail"
                                           aria-describedby="emailHelp"
                                           placeholder="Email Address" name="email" onChange={handleChange('email')} />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input className="form-control form-control-user" type="password"
                                            id="examplePasswordInput" placeholder="Password" name="password"
                                                   onChange={handleChange('password')}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input className="form-control form-control-user"
                                                   type="password" id="exampleRepeatPasswordInput"
                                                   placeholder="Repeat Password" name="password_repeat"
                                                   onChange={handleChange('conPassword')}/>
                                        </div>
                                    </div>

                                    {showSuccess()}
                                    {showError()}

                                    <button className="btn btn-primary btn-block text-white btn-user"
                                            onClick={clickSubmit}>Register Account
                                    </button>
                                    <hr/><a className="btn btn-primary btn-block text-white btn-google btn-user"
                                            role="button"><i className="fab fa-google"></i>&nbsp; Register with
                                    Google</a><a
                                    className="btn btn-primary btn-block text-white btn-facebook btn-user"
                                    role="button"><i className="fab fa-facebook-f"></i>&nbsp; Register with Facebook</a>
                                    <hr/>
                                </form>
                                <div className="text-center"><a className="small" href="#">Forgot
                                    Password?</a></div>
                                <div className="text-center">
                                    <Link className="small" to="/">
                                        Create an Account!
                                    </Link>
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
            {signUpForm()}
        </div>
    );
};

export default SignUp;
