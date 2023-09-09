import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuid } from 'uuid';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Layout from './Layout';
import NoNote from './NoNote';
import SavedNote from './SavedNote';
import EditNote from './EditNote';
import NotFound from './NotFound';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {

  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const [ accessToken, setAccessToken ] = useState(null);
  const [ email, setEmail ] = useState(null);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect( () => {
      setUser(null);
      setProfile(null);
  }, []);

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                      setAccessToken(user.access_token);
                      setEmail(res.data.email);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

  return (
    <>
      {profile ? (
        <Routes>
          <Route path = "/" element={<Layout accessToken={accessToken} email={email} logOut = {logOut}/>}>
            <Route index element = {<NoNote />}/>
            <Route path = "notes/:id" element = {<SavedNote/>}/>
            <Route path = "notes/:id/edit" element = {<EditNote/>}/>
          </Route>
          <Route path = "*" element = {<NotFound />}/>
        </Routes>
        ): (
          <>
          <div class = "header-cont">
            <div class = "header-button"></div>
            <div class = "header-title-1">
              <div id = "title"><b>Lotion</b></div>
              <div id = "title-desc"><b>Like Notion, but worse.</b></div>
            </div>
            <div class = "header-title-2"></div>
          </div>
          <div id = "login-button-cont">
            <div id = "login-button-center">
                <button id = "login-button" onClick={() => login()}>✍ Sign in to Lotion with Google ✍</button>
            </div>
          </div>
          <div class = "flex-end">
            <p id = "copyright">&#169; Harris Hasnain 2023</p>
          </div>
          </>
        )}
</>

  )

}

export default App;
