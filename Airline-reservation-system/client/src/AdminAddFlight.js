import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';
import axios from "axios"

function AdminAddFlight(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const [flightID, setFlightID] = useState(0);
    const [aircraft, setAircraft] = useState("");
    const [origin, setOrigin] = useState("none");
    const [destination, setDestination] = useState("none");
    const [start, setStart] = useState("none");
    const [end, setEnd] = useState("none");

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const handleReturn = () => {
        navigate("/admin")
      }

      useEffect(() => {
        if (origin.length === 0) {
            console.log("origin is empty")
            setOrigin("none")
        }
      }, [origin]);

      useEffect(() => {
        if (destination.length === 0) {
            console.log("destination is empty")
            setDestination("none")
        }
      }, [destination]);

      useEffect(() => {
        if (start.length === 0) {
            console.log("start is empty")
            setStart("none")
        }
      }, [start]);

      useEffect(() => {
        if (end.length === 0) {
            console.log("end is empty")
            setEnd("none")
        }
      }, [end]);

      const handleSubmit = () => {
        console.log(`ID: ${flightID}, aircraft: ${aircraft}, origin: ${origin}, destination: ${destination}, departure: ${start}, arrival: ${end} `)
        axios.post(`http://localhost:3002/add-flight`, {id: flightID, aircraft: aircraft, origin: origin, destination: destination, start_date: start, end_date: end }).then((response) => {
            axios.post(`http://localhost:3002/insert-flight-seats/${flightID}`).then((response) => {
            });
        });
        navigate("/admin")
      }

      const getNewFlightID = () => {
        axios.get(`http://localhost:3002/get-max-flight-id`).then((response) => {
          console.log("max flight id response in client:")
          console.log(response.data)
          if (response.data.length === 0) {
            setFlightID(0)
          }
          else {
            console.log(response.data.length)
            console.log(response.data[0]['MAX(IDNum)'])
            setFlightID(response.data[0]['MAX(IDNum)'] + 1)
          }
        });
      }

      const [aircraftList, setAircraftList] = useState([]);

      const getAircrafts = () => {
        axios.get(`http://localhost:3002/view-aircrafts`).then((response) => {
          console.log("aircraft response:")
          console.log(response.data)
          if (response.data.length > 0) {
            const aircrafts = response.data.map((aircraft) => aircraft.Name);
            setAircraftList(aircrafts)
          }
        });
      };

      useEffect(() => {
        getNewFlightID();
        getAircrafts();
      }, []);

      useEffect(() => {
        console.log("aircraft list in add flight:");
        console.log(aircraftList);
        if (aircraftList.length > 0) {
            setAircraft(aircraftList[0])
        }
    }, [aircraftList]);

    useEffect(() => {
        console.log("aircraft value:");
        console.log(aircraft);
    }, [aircraft]);

    useEffect(() => {
        console.log("flight ID:");
        console.log(flightID);
    }, [flightID]);

    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>Fill out this form to add a flight!</b></div>
                    <div id = "aircraft-warning"><b>Note: Must have at least one aircraft in the collection to create a flight...</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <div class = "body-cont">
                <h3>Chosen flight ID: {flightID}</h3>

                <h3>Select Aircraft:</h3>
                <select onChange={(event) => {setAircraft(event.target.value)}}>
                {aircraftList.map((aircraft, index) => (
                    <option value={aircraft}>{aircraft}</option>
                ))}
                </select>

                <h3>Enter origin:</h3>
                <input
                    type="text"
                    placeholder='enter origin...'
                    onChange={(event) => {
                        setOrigin(event.target.value);
                    }}
                />

                <h3>Enter destination:</h3>
                <input
                    type="text"
                    placeholder='enter destination...'
                    onChange={(event) => {
                        setDestination(event.target.value);
                    }}
                />

                <h3>Enter takeoff date and time:</h3>
                <input
                    type="text"
                    placeholder='Ex) "May 15th 2021, 4:00PM"'
                    onChange={(event) => {
                        setStart(event.target.value);
                    }}
                />

                <h3>Enter arrival date and time:</h3>
                <input
                    type="text"
                    placeholder='Ex) "May 15th 2021, 6:30PM"'
                    onChange={(event) => {
                        setEnd(event.target.value);
                    }}
                />
                
                <button id = {(aircraftList.length === 0) ? "blocked-button" : "submit-membership"} disabled={(aircraft.length === 0)} onClick = {() => {handleSubmit()}}>
                    {(aircraftList.length === 0) ? "Please add an aircraft to the collection first..." : `Add flight!`}</button>
            </div>

            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default AdminAddFlight;