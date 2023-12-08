import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './index.css';
import axios from "axios";
import emailjs from '@emailjs/browser';

function UserBuyFlight(props) {

    const {id} = useParams();

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const handleReturn = () => {
        navigate("/user-flight-list")
      }

      const [seatList, setSeatList] = useState([]);
      const [selectedSeat, setSelectedSeat] = useState(0);

      const [seatPrice, setSeatPrice] = useState(0);

      const [insurance, setInsurance] = useState("yes");

      const [creditCard, setCreditCard] = useState("");

      const getFlightSeats = () => {
        axios.get(`http://localhost:3002/flight-seat-list/${id}`).then((response) => {
          console.log("flight seat list response:")
          console.log(response.data)
          setSeatList(response.data)
        });
      }

      const changeSeat = (num, status, price) => {
        if (status === "empty") {
            setSelectedSeat(num)
            setSeatPrice(price)
        }
        else {
            setSelectedSeat(0)
            setSeatPrice(0)
        }
      }

      useEffect(() => {
        getFlightSeats();
      }, []);

      useEffect(() => {
        console.log("credit card length:")
        console.log(creditCard.length);
      }, [creditCard]);


    const serviceID = "service_r31i3st"
    const templateID = "template_4o0rpbv"
    const publicKey = "WPP6nM12xq4oBUqVA"

    const templateParams = {
        to_email: email,
        flight_id: id,
        seat: selectedSeat,
        price: seatPrice,
        insurance: insurance
    };


      const handleFlightSubmit = () => {

        axios.post(`http://localhost:3002/new-booking`, {email: email, id: id, seat_num: selectedSeat, ticket_cancellation: insurance }).then((response) => {

            axios.put(`http://localhost:3002/fill-user-seat`, {id: id, seat: selectedSeat}).then((response) => {

                // send email
                emailjs.send(serviceID, templateID, templateParams, publicKey).then((response) => {
                    console.log("email sent, response:")
                    console.log(response)
                }).catch((error) => {
                    console.log("email error:")
                    console.log(error)
                });
                // end send email

            });

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
                    <div id = "title-role"><b>&#128075; Hello, {email}!</b></div>
                    <div id = "title-desc"><b>Fill out the information below to buy a ticket for flight: {id}</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <h3 id = "user-seat-header">Choose your seat from the available seats below!</h3>

            <div class = "user-seats-cont">
                    {seatList.map((seat, index) => {
                        return (
                            <div class = {seat.Seat_status === "empty" ? "flight-seat-empty" : "flight-seat-full"}
                            onClick = {() => changeSeat(seat.Seat_number, seat.Seat_status, seat.Seat_price)}>
                                <h3>Seat number: {seat.Seat_number}</h3>
                                <h3>Class: {seat.Seat_type}</h3>
                                <h3>Price: {seat.Seat_price}</h3>
                                <h3>{seat.Seat_status}</h3>
                            </div>
                        )
                    })}
            </div>

            <div id = "selected_seat">
                <h3>Seat chosen: {selectedSeat ? `${selectedSeat}` : "none..."}</h3>
            </div>

            <div id ="ticket-cont">
                <h3>Get ticket cancellation insurance?</h3>
                <select onChange={(event) => {setInsurance(event.target.value)}}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <h3>Enter a credit card number to pay for your flight</h3>
                <input
                    type="text"
                    placeholder='enter card number...'
                    onChange={(event) => {
                        setCreditCard(event.target.value);
                      }}
                />
                <button id = {(selectedSeat === 0 || creditCard.length === 0) ? "blocked-button" : "submit-membership"} disabled={!(selectedSeat && creditCard.length)} onClick = {() => {handleFlightSubmit()}}>
                    {(selectedSeat === 0 || creditCard.length === 0) ? "Please choose an empty seat and enter your credit card information..." : `Purchase ticket for ${seatPrice}`}</button>
            </div>



            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default UserBuyFlight;