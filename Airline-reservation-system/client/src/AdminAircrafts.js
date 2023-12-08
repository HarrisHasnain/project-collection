import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './index.css';
import axios from "axios"

function AdminAircrafts(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const [aircraftList, setAircraftList] = useState([]);

      const getAircraftList = () => {
        axios.get(`http://localhost:3002/view-aircrafts`).then((response) => {
          console.log("aircraft response:")
          console.log(response.data)
          setAircraftList(response.data)
        });
      };

      const deleteAircraft = (name) => {
        axios.delete(`http://localhost:3002/remove-aircraft/${name}`).then((response) => {
            setAircraftList(
                aircraftList.filter((aircraft) => {
                    return (aircraft.Name != name);
                })
            );
        });
      }

      useEffect(() => {
        console.log("aircraft list:")
        console.log(aircraftList);
      }, [aircraftList]);

      useEffect(() => {
        getAircraftList();
      }, []);

      const handleReturn = () => {
        navigate("/admin")
      }

      const [newName, setNewName] = useState("");

      const handleNewAircraft = () => {
        axios.post(`http://localhost:3002/add-aircraft/${newName}`).then((response) => {
            const new_aircraft_array = [...aircraftList, {Name: newName}]
            setAircraftList(new_aircraft_array)
        });
      }
      
    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>Here is the aircraft collection information:</b></div>
                    <div id = "title-desc"><b>scroll to the bottom to add a new aircraft to this flight!</b></div>
                    <div id = "aircraft-warning"><b>&#9888; WARNING: deleting an aircraft will delete all flights and bookings using that aircraft! &#9888;</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <h3 class = "list-header">Aircrafts:</h3>

            <div class = "admin-crew-cont">
                {aircraftList.map((aircraft, index) => {
                    return (
                        <div class = "admin-crew">
                            <h3>Aircraft name: {aircraft.Name}</h3>
                            <button class = "delete-admin-crew" onClick={() => {deleteAircraft(aircraft.Name)}}>&#9888; Remove &#9888; Aircraft</button>
                        </div>
                    )
                })}
            </div>

                <div class = "user-form-cont">
                    <h3 class = "status-update-title">Fill out this form to add an aircraft to the collection...</h3>
                    <h3>Name:</h3>
                    <input
                        type="text"
                        placeholder='enter aircraft name...'
                        onChange={(event) => {
                            setNewName(event.target.value);
                        }}
                    />
                    <button id = {(newName.length === 0) ? "blocked-button" : "submit-membership"} disabled={(newName.length === 0)} onClick = {() => {handleNewAircraft()}}>
                    {(newName.length === 0) ? "Please enter a name for the aircraft" : `Add aircraft!`}</button>
                </div>

            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default AdminAircrafts;