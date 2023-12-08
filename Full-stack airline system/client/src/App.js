import React, {useState, useEffect} from 'react';
import './index.css';
import {Routes, Route} from 'react-router-dom';
import AccessLevel from './AccessLevel';
import User from './User';
import UserBenefits from './UserBenefits';
import UserSignup from './UserSignup';
import UserFlightList from './UserFlightList';
import UserBuyFlight from './UserBuyFlight';
import Employee from './Employee';
import EmployeeViewPassengers from './EmployeeViewPassengers';
import Admin from './Admin';
import AdminVerification from './AdminVerification';
import AdminAddFlight from './AdminAddFlight';
import AdminAircrafts from './AdminAircrafts';
import AdminCrew from './AdminCrew';
import AdminViewUsers from './AdminViewUsers';
import NotFound from './NotFound';
import EmployeeVerification from './EmployeeVerification';
import axios from 'axios';

function App() {

  const [ accessToken, setAccessToken ] = useState(0);
  const [ email, setEmail ] = useState("");

  const [ newEmail, setNewEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ existingEmail, setExistingEmail ] = useState("");
  const [ existingPassword, setExistingPassword ] = useState("");

  const [ accountList, setAccountList ] = useState([]);
  const [ incorrectAttempt, setIncorrectAttempt ] = useState(0);

  const [ formSubmit, setFormSubmit ] = useState(null);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      setFormSubmit(null)
      setEmail("")
      setNewEmail("")
      setPassword("")
      setExistingEmail("")
      setExistingPassword("")
      setIncorrectAttempt(0)
      getAccounts();
      console.log("logout")
  };

  const handleNewSubmission = () => {
    axios.post(`http://localhost:3002/new-account`, {email: newEmail, password: password}).then((response) => {
    });
    setEmail(newEmail)
    setFormSubmit(1)
  }

  const getAccounts = () => {
    axios.get(`http://localhost:3002/get-accounts`).then((response) => {
      setAccountList(response.data)
    });
  };

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    console.log("accounts:")
    console.log(accountList)
  }, [accountList]);

  const handleLogin = () => {
    accountList.forEach(acc => {
      console.log(existingEmail)
      console.log(existingPassword)
      console.log(acc.User_email)
      console.log(acc.Login_password)
      if (existingEmail == acc.User_email && (existingPassword == acc.Login_password)) {
        setEmail(existingEmail)
        setFormSubmit(1)
        return;
      }
      setIncorrectAttempt(1)
    })
  }



  return (
    <>
      {formSubmit ? (
        <Routes>
          <Route path = "/" element={<AccessLevel accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "user" element={<User accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "user-signup" element={<UserSignup accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "user-benefits" element={<UserBenefits accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "user-flight-list" element={<UserFlightList accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "user-book-flight/:id" element={<UserBuyFlight accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "verify-employee" element={<EmployeeVerification accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "employee" element={<Employee accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "employee-view-passengers/:id" element={<EmployeeViewPassengers accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "admin" element={<Admin accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "verify-admin" element={<AdminVerification accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "admin-view-crew/:id" element={<AdminCrew accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "admin-view-aircrafts" element={<AdminAircrafts accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "admin-view-users" element={<AdminViewUsers accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "admin-add-flight" element={<AdminAddFlight accessToken={accessToken} email={email} logOut = {logOut}/>}/>
          <Route path = "*" element = {<NotFound />}/>
        </Routes>
        ): (
          <>
          <div class = "header-cont">
            <div class = "header-button"></div>
            <div class = "header-title-1">
              <div id = "title"><b>&#9992;Airline Reservation System&#9992;</b></div>
              <div id = "title-desc"><b>Reserve a flight to any location!</b></div>
            </div>
            <div class = "header-title-2"></div>
          </div>

          <div id = "login-cont">

            <div id = "create-account">
                <h3><u>Create account:</u></h3>
                <h3>Email:</h3>
                    <input
                      id = "sign-in-input"
                        type="text"
                        placeholder='email...'
                        onChange={(event) => {
                            setNewEmail(event.target.value);
                        }}
                    />
                    <h3>Password:</h3>
                    <input
                        id = "sign-in-input"
                        type="text"
                        placeholder='password...'
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <br></br>
                    <button id = {(newEmail.length === 0 || password.length === 0) ? "blocked-button" : "submit-membership"} disabled={(newEmail.length === 0 || password.length === 0)} onClick = {() => {handleNewSubmission()}}>
                    {(newEmail.length === 0 || password.length === 0) ? "Please enter an email and password..." : `Add account!`}</button>
            </div>
            
            <div id = "sign-in">
              <h3><u>Log in:</u></h3>
              <h3>Enter your account email:</h3>
                    <input
                      id = "sign-in-input"
                        type="text"
                        placeholder='your email...'
                        onChange={(event) => {
                            setExistingEmail(event.target.value);
                        }}
                    />
                    <h3>Enter your account password:</h3>
                    <input
                        id = "sign-in-input"
                        type="text"
                        placeholder='your password...'
                        onChange={(event) => {
                            setExistingPassword(event.target.value);
                        }}
                    />
                    <br></br>
                    <button id = {(existingEmail.length === 0 || existingPassword.length === 0) ? "blocked-button" : "submit-membership"} disabled={(existingEmail.length === 0 || existingPassword.length === 0)} onClick = {() => {handleLogin()}}>
                    {(existingEmail.length === 0 || existingPassword.length === 0) ? "Please provide your email and password..." : `Login!`}</button>
                    <div id = "incorrect-login">{incorrectAttempt ? "Incorrect Username or Password. Try again..." : ""}</div>
            </div>

          </div>


          <div class = "flex-end">
            <p id = "copyright">&#169; Harris Hasnain 2023</p>
          </div>
          </>
        )}
</>

  )

}

export default App;