import React, {useState}  from 'react';
import {Link} from "react-router-dom";
import { NavLink, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { firestore } from "../../../firebase";
import { auth } from '../../../firebase';
import { addDoc, collection } from "@firebase/firestore";
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import logo from "../../../assets/images/logo.png";
import './Signin.css';


const Login = () => {
    const navigate = useNavigate();
    const ref = collection(firestore, "users");
    const [showHide, setShowHide] = useState(false);

    // Synchronous validation function
    const validate = value => {
        let errorMessage;
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          errorMessage = 'Invalid email address';
        }
        return errorMessage;
      };


return ( <div className="loginPage">
            <div className='picture'></div>
            <div className='loginContainer'>
                <div className='loginContent'>
                    <div className='logoContainer'>
                        <img src={logo} alt="logo"/>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            
                            if (!values.password) {
                                errors.password = 'Required field';
                            } else if (
                                !/^(?=.*\d)(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(values.password)
                            ) {
                                errors.password = 'Invalid password';
                            }

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(false);
                            signInWithEmailAndPassword(auth, values.email, values.password)
                            .then((userCredential) => {
                                const user = userCredential.user;
                                console.log(user);
                                navigate("/home")
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorCode, errorMessage);
                            });
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <Form onSubmit={handleSubmit} className="loginForm">
                                
                                <div className='formFieldContainer'>
                                    <label>Login</label>
                                    <Field 
                                        name="email"
                                        validate={validate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={`inputStyle ${ errors.email && touched.email && errors.email ? 'inputError' : '' }`}
                                    />
                                    <span className='errorMessasge'>{errors.email && touched.email && errors.email}</span>
                                </div>

                                <div className='formFieldContainer'>
                                    <label>Password</label>
                                    <div className={`inputStyle ${ errors.password && touched.password && errors.password ? 'inputError' : '' }`} id="passwordDiv">
                                        <Field
                                            type={showHide ? "text" : "password"}
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="passworsInput"
                                        />
                                        <div className="showHidebtn" onClick={(e) => { setShowHide(!showHide) }}>
                                            {showHide ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </div>
                                    </div>
                                    <span className='errorMessasge'>{errors.password && touched.password && errors.password}</span>    
                                </div>


                                <button type="submit" disabled={isSubmitting} className="loginSubmit">
                                    Login
                                </button>
                                <hr className='line'/>
                                <div>
                                    <span>Not a member? <Link to={'/signup'}>signup</Link></span>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div> )
};

export default Login;