import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { firestore } from "../../../firebase";
import { addDoc, collection } from "@firebase/firestore";
import { Formik, Field } from 'formik';

import logo from "../../../assets/images/logo.png";
import './Signup.css';
/* eye icons */
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
/* error massage */
import { message } from 'antd';

const Login = () => {
    const ref = collection(firestore, "users");
    const navigate = useNavigate();
    const [showHidePass, setShowHidePass] = useState(false);
    const [showHideConfirmPass, setShowHideConfirmPass] = useState(false);

    return (<div className="loginPage">
        <div className='picture'></div>
        <div className='loginContainer'>
            <div className='loginContent'>
                <div className='logoContainer'>
                    <img src={logo} alt="logo"></img>
                </div>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
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
                        <form onSubmit={handleSubmit} className="loginForm">
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
                            <label>E-mail</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={errors.email && touched.email
                                    ? "inputStyle error"
                                    : "inputStyle"
                                }
                            />
                            {errors.email && touched.email && (
                                <div className='inputFeedback'>{errors.email}</div>
                            )}
                            <div className='wrapperMaleFamel' role="group" aria-labelledby="my-radio-group">
                                <label className='male'>
                                    <Field type="radio" name="gender" value="Male" />
                                    Male
                                </label>
                                <label>
                                    <Field type="radio" name="gender" value="Female" />
                                    Female
                                </label>
                                {/* {values.gender} */}
                            </div>

                            <label>Password</label>
                            <div
                                className={errors.password && touched.password
                                    ? "wrapper inputStyle error"
                                    : "wrapper inputStyle"
                                }>
                                <input
                                    type={showHidePass ? "text" : "password"}
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
                            {errors.password && touched.password && (
                                <div className='inputFeedback'>{errors.password}</div>
                            )}

                            <label>Confirm Password</label>
                            <div
                                //className='wrapper inputStyle'
                                className={values.password === values.confirmPassword
                                    ? "wrapper inputStyle"
                                    : "wrapper inputStyle error"
                                }
                            >
                                <input
                                    type={showHideConfirmPass ? "text" : "password"}
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    className="passworsInput"
                                />
                                <div className="showHidebtn" onClick={(e) => { setShowHideConfirmPass(!showHideConfirmPass) }}>
                                    {showHideConfirmPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </div>
                            </div>
                             {errors.confirmPassword && touched.confirmPassword && (
                                <div className='inputFeedback'>{errors.confirmPassword}</div>
                            )}

                           
                            {/* {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword} */}

                            <button type="submit" disabled={isSubmitting} className="loginSubmit" onClick={() => {
                                //message.info('Message Content!');
                                //error(errors.email)
                            }}>
                                Register
                            </button>
                            <hr className='line' />
                            <div>
                                <span>Already have an account? <Link to={'/signin'}>signin</Link></span>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    </div>)
};

export default Login;