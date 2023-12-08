import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';
import axios from "axios"

function UserBenefits(props) {

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


      const [savedEmail, setSavedEmail] = useState("none");
      const [savedName, setSavedName] = useState("none");
      const [savedAddress, setSavedAddress] = useState("none");
      const [savedMembership, setSavedMembership] = useState("none");
      const [savedCard, setSavedCard] = useState("none");
      const [savedBenefits, setSavedBenefits] = useState("none");
      

      const getUserInfo = () => {
        axios.get(`http://localhost:3002/registered-users/${email}`).then((response) => {
          console.log("registered user response:")
          console.log(response.data)
          setSavedEmail(response.data[0].Email)
          setSavedName(response.data[0].Name)
          setSavedAddress(response.data[0].Address)
          setSavedMembership(response.data[0].Membership)
          setSavedCard(response.data[0].Company_card)
          setSavedBenefits(response.data[0].Advantages)
        });
      }

      useEffect(() => {
        getUserInfo();
      }, []);

      const deleteRegistration = () => {
        axios.delete(`http://localhost:3002/delete-user-membership/${email}`).then((response) => {
            navigate("/user")
        });
      }

    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>&#128075; Modify your status and perks</b></div>
                    <div id = "title-desc"><b>Please fill in the form again to update your information.</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <div class = "body-cont">
                <div class = "user-info">
                    <h3>Current Information:</h3><br></br>
                    Email: {email}<br></br><br></br>
                    Name: {savedName}<br></br><br></br>
                    Address: {savedAddress}<br></br><br></br>
                    Membership? {savedMembership}<br></br><br></br>
                    Company card? {savedCard}<br></br><br></br>
                    Benefits? {savedBenefits}<br></br><br></br>
                    <button id = "cancel-membership-button" onClick={deleteRegistration}>Cancel Registration</button>
                </div>
                <div class = "user-form-cont">
                    <h3 class = "status-update-title">Fill out this form to update your status...</h3>
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
            </div>

            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default UserBenefits;