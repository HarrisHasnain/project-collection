import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './index.css';
import axios from "axios"

function AdminCrew(props) {

    const { accessToken, email } = props;
    console.log("access token:")
    console.log(accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        props.logOut();
        navigate("/");
      };

      const {id} = useParams();

      const [crewList, setCrewList] = useState([]);

      const getCrewList = () => {
        axios.get(`http://localhost:3002/view-flight-crew/${id}`).then((response) => {
          console.log("crew response:")
          console.log(response.data)
          setCrewList(response.data)
        });
      };

      const deleteCrewMember = (name, flight_id) => {
        axios.delete(`http://localhost:3002/remove-crew-member`, { data: { name: name, flight_id: flight_id } }).then((response) => {
            setCrewList(
                crewList.filter((crew) => {
                    console.log("in filter:")
                    console.log(`name: ${crew.Member_name}`)
                    console.log(`argument name: ${name}`)
                    console.log(`not equal? ${crew.Member_name !== name}`)
                    console.log(`id: ${crew.Flight_IDNum}`)
                    console.log(`argument id: ${flight_id}`)
                    console.log(`not equal? ${crew.Flight_IDNum !== flight_id}`)
                    return ((crew.Flight_IDNum != flight_id) || (crew.Member_name != name));
                })
            );
        });
      }

      useEffect(() => {
        console.log("crew:")
        console.log(crewList);
      }, [crewList]);

      useEffect(() => {
        getCrewList();
      }, []);

      const handleReturn = () => {
        navigate("/admin")
      }

      const [memberName, setMemberName] = useState("");
      const [memberRole, setMemberRole] = useState("");

      const handleNewMember = () => {
        axios.post(`http://localhost:3002/add-crew-member`, {name: memberName, role: memberRole, flight_id: id}).then((response) => {
            const new_crew_array = [...crewList, {Member_name: memberName, Member_role: memberRole, Flight_IDNum: id}]
            setCrewList(new_crew_array)
        });
      }
      
    return (
        <>

            <div class = "header-cont">
                <div class = "return-button-cont">
                    <button id = "return-button" onClick={handleReturn}>Go Back</button>
                </div>
                <div class = "header-title-1">
                    <div id = "title-role"><b>Here is the crew information for flight: {id}</b></div>
                    <div id = "title-desc"><b>scroll to the bottom to add a new crew member to this flight!</b></div>
                </div>
                <div class = "header-title-2">
                    <div id = "login-info">👤 Logged in as: {email}</div>
                <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
                </div>
            </div>

            <h3 class = "list-header">Flight Crew:</h3>

            <div class = "admin-crew-cont">
                {crewList.map((crew, index) => {
                    return (
                        <div class = "admin-crew">
                            <h3>Member name: {crew.Member_name}</h3>
                            <h3>Member role: {crew.Member_role}</h3>
                            <button class = "delete-admin-crew" onClick={() => {deleteCrewMember(crew.Member_name, id)}}>Remove Crew Member</button>
                        </div>
                    )
                })}
            </div>

                <div class = "user-form-cont">
                    <h3 class = "status-update-title">Fill out this form to add a crew member to this flight...</h3>
                    <h3>Name:</h3>
                    <input
                        type="text"
                        placeholder='enter member name...'
                        onChange={(event) => {
                            setMemberName(event.target.value);
                        }}
                    />
                    <h3>Role:</h3>
                    <input
                        type="text"
                        placeholder='enter member role...'
                        onChange={(event) => {
                            setMemberRole(event.target.value);
                        }}
                    />
                    <button id = {(memberName.length === 0 || memberRole.length === 0) ? "blocked-button" : "submit-membership"} disabled={(memberName.length === 0 || memberRole.length === 0)} onClick = {() => {handleNewMember()}}>
                    {(memberName.length === 0 || memberRole.length === 0) ? "Please enter a name and role for the member..." : `Add crew member!`}</button>
                </div>

            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    );
}

export default AdminCrew;