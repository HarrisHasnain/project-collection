import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './index.css';
import axios from "axios"

function AdminViewUsers(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const [userList, setUserList] = useState([]);

      const getUserList = () => {
        axios.get(`http://localhost:3002/view-all-registered-users`).then((response) => {
          console.log("user list response:")
          console.log(response.data)
          setUserList(response.data)
        });
      };

      const deleteUser = (email) => {
        console.log(`email being passed into delete: ${email}`)
        axios.delete(`http://localhost:3002/remove-registered-user/${email}`).then((response) => {
            setUserList(
                userList.filter((user) => {
                    return (user.Email != email);
                })
            );
        });
      }

      useEffect(() => {
        console.log("users:")
        console.log(userList);
      }, [userList]);

      useEffect(() => {
        getUserList();
      }, []);

      const handleReturn = () => {
        navigate("/admin")
      }
      
    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>Here is the information of all registered users</b></div>
                    <div id = "aircraft-warning"><b>&#9888; WARNING: Removing a registered user cannot be reversed! &#9888;</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <h3 class = "list-header">Registered users:</h3>

            <div class = "admin-crew-cont">
                {userList.map((user, index) => {
                    return (
                        <div class = "admin-crew">
                            <h3>User email: {user.Email}</h3>
                            <h3>User name: {user.Name}</h3>
                            <h3>User address: {user.Address}</h3>
                            <h3>Membership? {user.Membership}</h3>
                            <h3>Company card? {user.Company_card}</h3>
                            <h3>Benefits? {user.Advantages}</h3>
                            <button class = "delete-admin-crew" onClick={() => {deleteUser(user.Email)}}>&#9888; Remove User &#9888;</button>
                        </div>
                    )
                })}
            </div>

            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default AdminViewUsers;