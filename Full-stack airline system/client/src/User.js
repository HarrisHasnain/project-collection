import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';
import axios from "axios"
import emailjs from '@emailjs/browser';

function User(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const [userFlightList, setUserFlightList] = useState([]);

      const getUserFlights = () => {
        console.log(`email in getUserFlights: ${email}`)
        axios.get(`http://localhost:3002/user/flights/${email}`).then((response) => {
          console.log("user flights response:")
          console.log(response.data)
          setUserFlightList(response.data)
        });
      };


      const [ cancelledFlight, setCancelledFLight] = useState(0)
      const [flightID, setFlightID] = useState(0)
      const [seatNum, setSeatNum] = useState("none")
      const [seatPrice, setSeatPrice] = useState("none")

      const serviceID = "service_r31i3st"
      const templateID = "template_dryom4r"
      const publicKey = "WPP6nM12xq4oBUqVA"

      const deleteUserFlight = (email, flight_id, seat_num, seat_price) => {
        setFlightID(flight_id)
        setSeatNum(seat_num)
        setSeatPrice(seat_price)
        setCancelledFLight(1)
        axios.delete(`http://localhost:3002/delete/user-flight`, { data: { email: email, id: flight_id, seat: seat_num } }).then((response) => {
            setUserFlightList(
                userFlightList.filter((flight) => {
                    return (flight.Flight_IDNum !== flight_id || flight.Seat_number !== seat_num);
                })
            );

            // send email
            const templateParams = {
              to_email: email,
              flight_id: flight_id,
              seat_num: seat_num,
              seat_cost: seat_price,
          };

            emailjs.send(serviceID, templateID, templateParams, publicKey).then((response) => {
              console.log("email sent, response:")
              console.log(response)
            }).catch((error) => {
                console.log("email error:")
                console.log(error)
            });
            // end send email


            emptyUserSeat(flight_id, seat_num);
        });
      }

      const emptyUserSeat = (flight_id, seat_num) => {
        axios.put(`http://localhost:3002/empty-user-seat`, {id: flight_id, seat: seat_num}).then((response) => {
        });
      }

      useEffect(() => {
        console.log(userFlightList);
      }, [userFlightList]);

      const [registeredStatus, setRegisteredStatus] = useState(0);

      const checkRegisteredStatus = () => {
        axios.get(`http://localhost:3002/registered-users/${email}`).then((response) => {
          console.log("registered user response:")
          console.log(response.data)
          console.log(response.data.length)
          setRegisteredStatus(response.data.length)
        });
      }

     const handleRegisterNavigation = () => {
        if (registeredStatus === 0) {
            navigate("/user-signup")
        }
        else {
            navigate("/user-benefits")
        }
      }

      useEffect(() => {
        getUserFlights();
        checkRegisteredStatus();
      }, []);

      useEffect(() => {
        console.log("register status:")
        console.log(registeredStatus)
      }, [registeredStatus]);

      const viewUserFlights = () => {
        navigate("/user-flight-list")
      }

      const handleReturn = () => {
        navigate("/")
      }
      
    return (
        <>

            <div class = "header-cont">
                <div class = "register-cont">
                    <h3 id = "registered-status">{registeredStatus === 1 ? 'Registered' : 'Not Registered'}</h3>
                    <button id = "register-button" onClick={handleRegisterNavigation}>{registeredStatus === 1 ? 'Modify Info' : 'Register'}&#128176;</button>
                    <button id = "return-button-user" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>&#128075; Hello, {email}!</b></div>
                    <div id = "title-desc"><b>Your access level is: User</b></div>
                    <div id = "aircraft-warning"><b>{cancelledFlight ? "Flight successfully cancelled..." : ""}</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <h3 class = "list-header">Your Flights: <button id = "view-available-flights" onClick={viewUserFlights}>See available flights!</button></h3>

            <div class = "user-flights-cont">
                {userFlightList.map((flight, index) => {
                    return (
                        <div class = "user-flight">
                            <h3><i>&#9992; Flight For: {email} &#9992;</i></h3>
                            <h3><u>Flight Info:</u></h3>
                            <h3>Flight ID: {flight.Flight_IDNum}</h3>
                            <h3>Origin: {flight.Origin} || Destination: {flight.Destination}</h3>
                            <h3>Takeoff Time: {flight.Start_date} || Landing Time: {flight.End_date}</h3>
                            <h3><u>Seat Info:</u></h3>
                            <h3>Seat number: {flight.Seat_number} || Class: {flight.Seat_type}</h3>
                            <h3>Seat price {flight.Seat_price} || Ticket insurance: {flight.Ticket_insurance}</h3>
                            <button class = "delete-user-flight" onClick={() => {deleteUserFlight(email, flight.Flight_IDNum, flight.Seat_number, flight.Seat_price)}}>Cancel Flight</button>
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

export default User;