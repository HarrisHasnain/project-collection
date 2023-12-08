import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';
import axios from "axios"

function UserSignup(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const [name, setName] = useState("none");
    const [address, setAddress] = useState("none");
    const [membership, setMembership] = useState("yes");
    const [card, setCard] = useState("yes");
    const [benefits, setBenefits] = useState("yes");

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const handleReturn = () => {
        navigate("/user")
      }

      useEffect(() => {
        if (name.length === 0) {
            console.log("name kinda short")
            setName("none")
        }
      }, [name]);

      useEffect(() => {
        if (address.length === 0) {
            console.log("address kinda short")
            setAddress("none")
        }
      }, [address]);

      const handleSubmit = () => {
        console.log(`Name: ${name}, Address: ${address}, Membership: ${membership}, Card: ${card}, Benefits: ${benefits}, `)
        axios.post(`http://localhost:3002/new-membership`, {email: email, name: name, address: address, membership: membership, card: card, benefits: benefits }).then((response) => {
        });
        navigate("/user")
      }

    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>&#128075; Fill out this form to sign up!</b></div>
                    <div id = "title-desc"><b>Please fill in all information accurately.</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <div class = "body-cont">
                <h3>Name:</h3>
                <input
                    type="text"
                    placeholder='enter name...'
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <h3>Address:</h3>
                <input
                    type="text"
                    placeholder='enter address...'
                    onChange={(event) => {
                        setAddress(event.target.value);
                    }}
                />
                <h3>Register for a membership?</h3>
                <select onChange={(event) => {setMembership(event.target.value)}}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <h3>Get the company credit card?</h3>
                <select onChange={(event) => {setCard(event.target.value)}}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <h3 class = "benefits"><p class = "benefits-header">Sign up for added benefits?</p>
                    <ul>
                        <li>Receive monthly promotional news!</li>
                        <li>Use airport lounges with a discounted price!</li>
                        <li>Get a free companion ticket once a year!</li>
                    </ul>
                </h3>
                <select onChange={(event) => {setBenefits(event.target.value)}}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <button id = "submit-membership" onClick={handleSubmit}>Submit!</button>
            </div>

            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default UserSignup;