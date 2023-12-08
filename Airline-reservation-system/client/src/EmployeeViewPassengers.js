import React, {useEffect, useState} from 'react';
import axios from "axios"
import {useNavigate, useParams} from 'react-router-dom';
import './index.css';

function EmployeeViewPassengers(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const handleReturn = () => {
        navigate("/employee")
      }

      const {id} = useParams();

      const [flightOrigin, setFlightOrigin] = useState(null);
      const [flightDestination, setFlightDestination] = useState(null);
      const [flightStart, setFlightStart] = useState(null);
      const [flightEnd, setFlightEnd] = useState(null);
      const [flightAircraft, setFlightAircraft] = useState(null);

      const getSpecificFlight = () => {
        console.log(`id in getSpecificFlight: ${id}`)
        axios.get(`http://localhost:3002/flights/specific/${id}`).then((response) => {
          console.log("specific flight response sent to employee:")
          console.log(response.data)
          setFlightOrigin(response.data[0].Origin)
          setFlightDestination(response.data[0].Destination)
          setFlightStart(response.data[0].Start_date)
          setFlightEnd(response.data[0].End_date)
          setFlightAircraft(response.data[0].Aircraft)
        });
      };

      const [passengerList, setPassengerList] = useState([]);

      const getFlightPassengers = () => {
        console.log(`id in getFlightPassengers: ${id}`)
        axios.get(`http://localhost:3002/flights/passengers/${id}`).then((response) => {
          console.log("specific passenger response:")
          console.log(response.data)
          setPassengerList(response.data)
        });
      };

      useEffect(() => {
        getSpecificFlight();
        getFlightPassengers();
      }, []);

    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>&#128075; Hello, {email}!</b></div>
                    <div id = "title-desc"><b>Here is the information you requested for flight: {id}</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                    <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <div class = "flight-info-cont">
                <h3>Flight ID: {id}</h3>
                <h3>Origin: {flightOrigin} || Destination: {flightDestination}</h3>
                <h3>Takeoff Time: {flightStart} || Landing Time: {flightEnd}</h3>
                <h3>Aircraft: {flightAircraft}</h3>
            </div>

            <div class = "passenger-cont"><h3>Passengers:</h3>
                {passengerList.map((passenger, index) => {
                    return (
                        <div class = "passenger">
                            <h3>Passenger email: {passenger.Passenger_email}</h3>
                            <h3>Seat number: {passenger.Seat_number} || Class: {passenger.Seat_type}</h3>
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

export default EmployeeViewPassengers;