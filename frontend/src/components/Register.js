import React, { useState } from 'react';
import "../styles/Authentication.css";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    function navigateLogin() {
        navigate("/login");
    }
    function navigateSearch() {
        navigate("/");
    }
    function handleRegister(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords Do Not Match");
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }
        axios({
            method: "POST",
            data: {
                username: email,
                password: password,
                address: address,
                data: []
            },
            withCredentials: true,
            url: "http://localhost:4000/registerBackend"
        }).then((res) => {
            if (res.data === true) {
                navigate("/login");
            }
        }).catch(() => {
            setMessage("Email Already Exists");
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
        });
    }
    return (
        <div className="login-wrapper">
            <div className="header">
                <div className="logo" onClick={() => navigateSearch()}>
                    <FontAwesomeIcon icon={faHouse} size="xl"/>      
                </div>
                <div className="register-title">
                    <h2>
                        Register
                    </h2>
                </div>
                <div className="profile-invisible">
                </div>
            </div>
            <div className="login-container">
                <form className="login-box" onSubmit={(event) => handleRegister(event)}>
                    <div className={error === true ? 'login-save-message login-error-visible' : 'login-save-message login-error-hidden'}>
                        {message}
                    </div>
                    <label htmlFor="email-username">
                        Email
                    </label>
                    <input type="text" required name="email-username" className="auth-field text-input" onChange={(event) => setEmail(event.currentTarget.value)}/>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" required name="password" className="auth-field text-input" onChange={(event) => setPassword(event.currentTarget.value)}/>
                    <label htmlFor="confirm-password">
                        Retype Password
                    </label>
                    <input type="password" required name="confirm-password" className="auth-field text-input" onChange={(event) => setConfirmPassword(event.currentTarget.value)}/>
                    <label htmlFor="address">
                        Address
                    </label>
                    <input type="text" required name="address" className="auth-field text-input" onChange={(event) => setAddress(event.currentTarget.value)}/>
                    <input type="submit" name="Login" value="Register" className="login-button"/>
                    <div className="create-account" onClick={() => navigateLogin()}>
                        Login
                    </div>
                </form>
            </div>
        </div>
    )
}