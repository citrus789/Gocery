import React, { useState } from 'react';
import "../styles/Authentication.css";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    function navigateRegister() {
        navigate("/register");
    }
    function navigateSearch() {
        navigate("/");
    }
    function handleLogin(event) {
        event.preventDefault();
        axios({
            method: "POST",
            data: {
                username: email,
                password: password
            },
            withCredentials: true,
            url: "http://localhost:4000/loginBackend"
        }).then((res) => {
            if (res.data === true) {
                navigate("/profile");
            }
        }).catch(() => {
            setMessage("Invalid Email or Password");
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
                <div className="login-title">
                    <h2>
                        Login
                    </h2>
                </div>
                <div className="profile-invisible">
                    {/* <FontAwesomeIcon icon={faUser} size="xl"/> */}
                </div>
            </div>
            <div className="login-container">
                <form className="login-box" onSubmit={(event) => handleLogin(event)}>
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

                    <input type="submit" name="Login" value="Login" className="login-button"/>
                    <div className="create-account" onClick={() => navigateRegister()}>
                        Register
                    </div>
                </form>
            </div>
        </div>
    )
}