import React, {useEffect, useState} from 'react';
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import './index.css';

function UserFlightList(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
    };

    const [flightList, setFlightList] = useState([]);

    const getFlightList = () => {
        axios.get("http://localhost:3002/flights/all").then((response) => {
          console.log("response sent to employee:")
          console.log(response.data)
          setFlightList(response.data);
        });
      };

      useEffect(() => {
        getFlightList();
      }, []);

      useEffect(() => {
        console.log("flight list in employee:");
        console.log(flightList);
    }, [flightList]);

    const viewExtraDetails = (id) => {
        console.log("entered view function")
        navigate(`/user-book-flight/${id}`)
    }

    const handleReturn = () => {
        navigate("/user")
      }
    

    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>&#128075; Hello, {email}!</b></div>
                    <div id = "title-desc"><b>Book your flights here!</b></div>
                    <div id = "employee-desc"><b>&#11015;Click on a flight to book a seat&#11015;</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <div class = "employee-flight-cont">
                {flightList.map((flight, index) => {
                    return (
                        <div class = "flight" onClick={() => viewExtraDetails(flight.IDNum)}>
                            <h3>Flight ID: {flight.IDNum}</h3>
                            <h3>Origin: {flight.Origin} || Destination: {flight.Destination}</h3>
                            <h3>Takeoff Time: {flight.Start_date} || Landing Time: {flight.End_date}</h3>
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

export default UserFlightList;