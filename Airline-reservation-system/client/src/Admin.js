import React, {useEffect, useState} from 'react';
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import './index.css';

function Admin(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
    };

    const [flightList, setFlightList] = useState(["none"]);
    const [aircraftList, setAircraftList] = useState([]);

    const [newOrigin, setNewOrigin] = useState("none");
    const [newDestination, setNewDestination] = useState("none");
    const [newStart, setNewStart] = useState("none");
    const [newEnd, setNewEnd] = useState("none");
    const [newAircraft, setNewAircraft] = useState("none");

    const getFlightList = () => {
        axios.get("http://localhost:3002/flights/all").then((response) => {
          console.log("response sent to admin:")
          console.log(response.data)
          setFlightList(response.data);
          axios.get(`http://localhost:3002/view-aircrafts`).then((response) => {
            console.log("aircraft response:")
            console.log(response.data)
            const aircrafts = response.data.map((aircraft) => aircraft.Name);
            setAircraftList(aircrafts);
            });
        });
      };

      useEffect(() => {
        getFlightList();
      }, []);

      useEffect(() => {
        console.log("flight list in admin:");
        console.log(flightList);
    }, [flightList]);

    useEffect(() => {
        console.log("aircraft list in admin:");
        console.log(aircraftList);
        setNewAircraft(aircraftList[0])
    }, [aircraftList]);

    const viewCrewDetails = (id) => {
        console.log("entered view function")
        navigate(`/admin-view-crew/${id}`)
    }

    const handleReturn = () => {
        navigate("/")
      }

    const updateOrigin = (flight_id) => {
        axios.put("http://localhost:3002/update-origin", { id: flight_id, new_origin: newOrigin }).then((response) => {
            setFlightList(
                flightList.map((flight) => {
                  return flight.IDNum == flight_id
                    ? {
                        IDNum: flight.IDNum,
                        Aircraft: flight.Aircraft,
                        Origin: newOrigin,
                        Destination: flight.Destination,
                        Start_date: flight.Start_date,
                        End_date: flight.End_date,
                      }
                    : flight;
                })
            );
        });
    }

    const updateDestination = (flight_id) => {
        axios.put("http://localhost:3002/update-destination", { id: flight_id, new_destination: newDestination }).then((response) => {
            setFlightList(
                flightList.map((flight) => {
                  return flight.IDNum == flight_id
                    ? {
                        IDNum: flight.IDNum,
                        Aircraft: flight.Aircraft,
                        Origin: flight.Origin,
                        Destination: newDestination,
                        Start_date: flight.Start_date,
                        End_date: flight.End_date,
                      }
                    : flight;
                })
            );
        });
    }

    const updateTakeoff = (flight_id) => {
        axios.put("http://localhost:3002/update-takeoff", { id: flight_id, new_takeoff: newStart }).then((response) => {
            setFlightList(
                flightList.map((flight) => {
                  return flight.IDNum == flight_id
                    ? {
                        IDNum: flight.IDNum,
                        Aircraft: flight.Aircraft,
                        Origin: flight.Origin,
                        Destination: flight.Destination,
                        Start_date: newStart,
                        End_date: flight.End_date,
                      }
                    : flight;
                })
            );
        });
    }

    const updateArrival = (flight_id) => {
        axios.put("http://localhost:3002/update-arrival", { id: flight_id, new_arrival: newEnd }).then((response) => {
            setFlightList(
                flightList.map((flight) => {
                  return flight.IDNum == flight_id
                    ? {
                        IDNum: flight.IDNum,
                        Aircraft: flight.Aircraft,
                        Origin: flight.Origin,
                        Destination: flight.Destination,
                        Start_date: flight.Start_date,
                        End_date: newEnd,
                      }
                    : flight;
                })
            );
        });
    }

    const updateAircraft = (flight_id) => {
        axios.put("http://localhost:3002/update-aircraft", { id: flight_id, new_aircraft: newAircraft }).then((response) => {
            setFlightList(
                flightList.map((flight) => {
                  return flight.IDNum == flight_id
                    ? {
                        IDNum: flight.IDNum,
                        Aircraft: newAircraft,
                        Origin: flight.Origin,
                        Destination: flight.Destination,
                        Start_date: flight.Start_date,
                        End_date: flight.End_date,
                      }
                    : flight;
                })
            );
        });
    }

    const deleteFlight = (flight_id) =>  {
        axios.delete(`http://localhost:3002/delete-flight/${flight_id}`, { id: flight_id, new_aircraft: newAircraft }).then((response) => {
            setFlightList(
                flightList.filter((flight) => {
                    return (flight.IDNum !== flight_id);
                })
            );
        });
    }

    const viewAircrafts = () => {
        navigate("/admin-view-aircrafts")
    }

    const viewRegisteredUsers = () => {
        navigate("/admin-view-users")
    }

    const viewNewFlight = () => {
        navigate("/admin-add-flight")
    }

    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>&#128075; Hello, {email}!</b></div>
                    <div id = "title-desc"><b>Your access level is: Admin</b></div>
                    <div id = "employee-desc"><b>&#11015;Scroll to see the list of all flights...&#11015;</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <h3 class = "list-header">Flight list:
            <button id = "view-available-flights" onClick={viewNewFlight}>+ add new flight</button>
            <button id = "view-available-flights-admin" onClick={viewAircrafts}>View owned aircrafts</button>
            <button id = "view-available-flights-admin" onClick={viewRegisteredUsers}>View registered users</button>
            </h3>

            <div class = "admin-flight-cont">
                {flightList.map((flight, index) => {
                    return (
                        <div class = "admin-flight">
                            <h3>Flight ID: {flight.IDNum}</h3>
                            <h3><button id = "view-flight-crew-admin" onClick={() => viewCrewDetails(flight.IDNum)}>View flight crew</button></h3>
                            <h3>Origin: {flight.Origin}</h3>
                            <input
                                type="text"
                                placeholder='update origin...'
                                onChange={(event) => {
                                    setNewOrigin(event.target.value);
                                }}
                            />
                            <button id = "admin-update" onClick={() => updateOrigin(flight.IDNum)}>Update</button>
                            <h3>Destination: {flight.Destination}</h3>
                            <input
                                type="text"
                                placeholder='update destination...'
                                onChange={(event) => {
                                    setNewDestination(event.target.value);
                                }}
                            />
                            <button id = "admin-update" onClick={() => updateDestination(flight.IDNum)}>Update</button>
                            <h3>Takeoff Time: {flight.Start_date}</h3>
                            <input
                                type="text"
                                placeholder='update departure...'
                                onChange={(event) => {
                                    setNewStart(event.target.value);
                                }}
                            />
                            <button id = "admin-update" onClick={() => updateTakeoff(flight.IDNum)}>Update</button>
                            <h3>Landing Time: {flight.End_date}</h3>
                            <input
                                type="text"
                                placeholder='update arrival...'
                                onChange={(event) => {
                                    setNewEnd(event.target.value);
                                }}
                            />
                            <button id = "admin-update" onClick={() => updateArrival(flight.IDNum)}>Update</button>
                            <h3>Aircraft: {flight.Aircraft}</h3>
                            <select onChange={(event) => {setNewAircraft(event.target.value)}}>
                            {aircraftList.map((aircraft, index) => (
                                <option value={aircraft}>{aircraft}</option>
                            ))}
                            </select>
                            <button id = "admin-update" onClick={() => updateAircraft(flight.IDNum)}>Update</button>
                            <button class = "delete-user-flight" onClick={() => deleteFlight(flight.IDNum)}>Delete Flight</button>
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

export default Admin;