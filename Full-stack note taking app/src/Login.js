import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './index.css';
import { BrowserRouter, Routes, Route, Outlet, useNavigate, Navigate } from 'react-router-dom';

function Login() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect( () => {
        setProfile(null);
    }, []);

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {user.access_token}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ): (
                <div id = "login-button-cont">
                    <div id = "login-button-center">
                        <button id = "login-button" onClick={() => login()}>🚀 Sign in to Lotion with Google 🚀</button>
                    </div>
                </div>
            )}
        </>
    );
}
export default Login;