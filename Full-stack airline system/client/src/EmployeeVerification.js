import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';
import axios from "axios"

function EmployeeVerification(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const [adminPassword, setAdminPassword] = useState("");
      const [guessedPassword, setGuessedPassword] = useState("");
      const [incorrectGuess, setIncorrectGuess] = useState(0);

      const fillAdminPassword = () => {
        axios.get(`http://localhost:3002/employee-password`).then((response) => {
          console.log("admin password response:")
          console.log(response.data)
          setAdminPassword(response.data[0].Login_password)
        });
      };

      useEffect(() => {
        fillAdminPassword();
      }, []);

      useEffect(() => {
        console.log(adminPassword);
      }, [adminPassword]);

      const handleLoginSubmit = () => {
        if (guessedPassword === adminPassword) {
            navigate("/employee")
        }
        else {
            setIncorrectGuess(1);
        }
      }

      const handleReturn = () => {
        navigate("/")
      }

    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>&#128075; Hello, {email}!</b></div>
                    <div id = "title-desc"><b>Please verify your status as an employee by entering the correct password below!</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <div class = "admin-login-cont">
                <h3 id = "login-password-header">Enter the employee password here:</h3>
                <input
                    type="text"
                    placeholder='enter password...'
                    onChange={(event) => {
                        setGuessedPassword(event.target.value);
                    }}
                    id = "admin-login-box"
                />
                <button id = "submit-membership" onClick={handleLoginSubmit}>Login</button>
                <div id = "incorrect-login">{incorrectGuess ? "Incorrect password. Try again..." : ""}</div>
            </div>

            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default EmployeeVerification;