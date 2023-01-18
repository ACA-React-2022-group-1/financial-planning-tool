import React, {useState}  from 'react';
import {Link} from "react-router-dom";
import { NavLink, useNavigate } from 'react-router-dom';

import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../../firebase';
import { firestore } from "../../../firebase";
import { addDoc, collection } from "@firebase/firestore";
import { Formik, Form, Field } from 'formik';

import logo from "../../../assets/images/logo.png";
import './Signup.css';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Login = () => {
    const ref = collection(firestore, "users");
    const navigate = useNavigate();
    const [showHidePass, setShowHidePass] = useState(false);
    const [showHideConfirmPass, setShowHideConfirmPass] = useState(false);

    // Synchronous validation function
    const validate = value => {
        let errorMessage;
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            errorMessage = 'Invalid email address';
        }
        return errorMessage;
        };

    const passValidate = value => {
        let errorMessage;
        if (value) {
            errorMessage = 'Required field';
        } else if (
            !/^(?=.*\d)(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(value)
        ) {
            errorMessage = 'Invalid password';
        }
        return errorMessage
    }

return ( <div className="loginPage">
            <div className='picture'></div>
            <div className='signUpContainer'>
                <div className='loginContent'>
                    <div className='logoContainer'>
                        <img src={logo} alt="logo"></img>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(false);
                            await createUserWithEmailAndPassword(auth, values.email, values.password)
                            .then((userCredential) => {
                                const user = userCredential.user;
                                console.log(user);
                                navigate("/signin")
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

                                <div className='wrapperNameSurname'>
                                    <div className='wrapperName'>
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            className='nameInput'
                                        />
                                    </div>
                                    <div className='wrapperSurname'>
                                        <label>Surname</label>
                                        <input
                                            type="text"
                                            name="surname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.surname}
                                            className='surnameInput'
                                        />
                                    </div>
                                </div>

                                <div className='formFieldContainer'>
                                    <label>E-mail</label>
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

                                <div className='wrapperMaleFamel' role="group" aria-labelledby="my-radio-group">
                                    <label className='male'>
                                        <Field type="radio" name="gender" value="Male" />
                                        Male
                                    </label>
                                    <label>
                                        <Field type="radio" name="gender" value="Female" />
                                        Female
                                    </label>
                                </div>

                                <div className='formFieldContainer'>
                                    <label>Password</label>
                                    <div className={`inputStyle ${ errors.password && touched.password && errors.password ? 'inputError' : '' }`} id="passwordDiv">
                                        <Field
                                            type={showHidePass ? "text" : "password"}
                                            validate={passValidate}
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="passworsInput"
                                        />
                                        <div className="showHidebtn" onClick={(e) => { setShowHidePass(!showHidePass) }}>
                                            {showHidePass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </div>
                                    </div>
                                    <span className='errorMessasge'>{errors.password && touched.password && errors.password}</span>    
                                </div>

                                <div className='formFieldContainer'>
                                    <label>Confirm Password</label>
                                    <div className={`inputStyle ${ errors.password && touched.password && errors.password ? 'inputError' : '' }`} id="passwordDiv">
                                        <Field
                                            type={showHideConfirmPass ? "text" : "password"}
                                            name="confirmPassword"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="passworsInput"
                                        />
                                        <div className="showHidebtn" onClick={(e) => { setShowHideConfirmPass(!showHideConfirmPass) }}>
                                            {showHideConfirmPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </div>
                                    </div>
                                    <span className='errorMessasge'>{errors.password && touched.password && errors.password}</span>    
                                </div>


                                <button type="submit" disabled={isSubmitting} className="loginSubmit">
                                    Register
                                </button>
                                <hr className='line'/>
                                <div>
                                    <span>Already have an account? <Link to={'/signin'}>signin</Link></span>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
         </div> )
};

export default Login;