import React from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';

function AccessLevel(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
    };

    const handleUserSelect = () => {
        navigate("/user");
    };

    const handleEmployeeSelect = () => {
        navigate("/verify-employee");
    };

    const handleAdminSelect = () => {
        navigate("/verify-admin");
    };

    return (
        <>

            <div class = "header-cont">
                <div class = "header-button">
                </div>
                <div class = "header-title-1">
                    <div id = "title-select-level"><b>&#11015; Select Your Access Level &#11015;</b></div>
                    <div id = "title-desc"><b>Choose one of the options below!</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <div class = "body-cont">
                <div class = "user-select-button">
                    <button id = "select-user" onClick={handleUserSelect}>User</button>
                </div>
                <div class = "employee-select-button">
                    <button id = "select-employee" onClick={handleEmployeeSelect}>Employee</button>
                </div>
                <div class = "admin-select-button">
                    <button id = "select-admin" onClick={handleAdminSelect}>Admin</button>
                </div>
            </div>

            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default AccessLevel;