import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuid } from 'uuid';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Outlet, useNavigate, Navigate } from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Layout(props) {

  // delete URL:  "https://owrol3crvblejj22ne6jeqnlcq0ujjws.lambda-url.ca-central-1.on.aws/"
  // get URL:     "https://bd2jzw5dpzqnrdxsbjaj6vrai40rqjgh.lambda-url.ca-central-1.on.aws/"
  // save url:

  const { accessToken, email } = props;

  const [notesDisplay, setNotesDisplay] = useState(false);

  const [accessNotes, setAccessNotes] = useState(false);

  const handleLogout = () => {
    props.logOut();
    navigate("/");
  };

  const [notes, setNotes] = useState([]);

  // add here

  const getUserNotes = async () => {

    const res = await fetch(
      "https://n2en4xwtt6isamcuyamzzbvewa0pfnqd.lambda-url.ca-central-1.on.aws/?email=" + email,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "email": `${email}`,
          "accesstoken": `${accessToken}`,
        },
      }
    );

    const jsonRes = await res.json();
    console.log("returned notes>>")
    console.log(jsonRes);
    console.log("<<returned notes")

    const modifiedNotes = jsonRes.map((note) => {
      return {
        ...note,
        //id: note.id,
        lastModified: new Date(parseInt(note.lastModified)),
      };
    });

    console.log("modded notes>>")
    console.log(modifiedNotes);
    console.log("<<modded notes")

    setNotes(modifiedNotes)

    setAccessNotes(true);

  }

  useEffect(() => {
    if (email) {
      getUserNotes();
    }

  }, [email]);

  useEffect(() => {
    if (email) {
      if (accessNotes) {
        console.log(notes.length)
        if (notes.length == 0) {
          notesRef.current.textContent = 'No note yet.'
          notesRef.current.style.color = 'grey';
          notesRef.current.style.textAlign = 'center';
          notesRef.current.style.paddingTop = '20px';
          notesRef.current.style.fontSize = '200%';
        }
        else if (notes.length != 0) {
          notesRef.current.style.color = 'black';
          notesRef.current.style.textAlign = 'left';
          notesRef.current.style.paddingTop = '0px';
          notesRef.current.style.fontSize = '100%';
        }
      }
    }
  }, [notes]);

  const notesDisplayRef = useRef(null);

  function handleNotesDisplay(e) {
    setNotesDisplay(!notesDisplay);
    notesDisplayRef.current.style.display = notesDisplay ? 'flex' : 'none';
  }

  const notesRef = useRef(null);


  /*
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(notes);
  }, [notes]);
  */

  const [activeNote, setActiveNote] = useState(false);

  const navigate = useNavigate();

  const onAddNote = () => {
    if (notes.length == 0) {
        notesRef.current.textContent = '';
        notesRef.current.style.color = 'black';
        notesRef.current.style.textAlign = 'left';
        notesRef.current.style.paddingTop = '0px';
        notesRef.current.style.fontSize = '100%';
    }
    if (notes.length < 10) {
        const newNote = {
            email: email,
            id: uuid(),
            title: "Untitled",
            body: "",
            lastModified: Date.now(),
        };
        const {id} = newNote;
        setNotes([newNote, ...notes]);
        setActiveNote(newNote.id);
        navigate(`/notes/${id}/edit`);
    }

    else {
        window.alert('Maximum of 10 notes. Please delete a note to make more space.')
    }
  };

  const onDeleteNote = async (noteId) => {

    const answer = window.confirm("Are you sure you want to delete this note?");

    if (answer) {
      
      const notePasser = {
        email: email,
        id: noteId,
      };

      console.log("email: " + email + " Type: " + typeof(email))
      console.log("id: " + noteId + " Type: " + typeof(noteId))

      // backend
      const res = await fetch(
        "https://bo5rccw3czzbbo6s4ajg26o5py0mwotg.lambda-url.ca-central-1.on.aws/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "email": `${email}`,
            "accesstoken": `${accessToken}`,
          },
          body: JSON.stringify(notePasser),
        }
    );

    const jsonRes = await res.json();
    console.log(jsonRes);
    console.log("hey")

    setNotes(notes.filter(({ id }) => id !== noteId));
    
    navigate("/");

    }
  };

  const onSaveNote = async (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);

    const newUpdatedNote = {
      ...updatedNote,
      id: updatedNote.id.toString(),
      lastModified: updatedNote.lastModified.toString()
    }

    console.log("updatenew");
    console.log(newUpdatedNote);
    console.log("updatenew");

    // backend
    const res = await fetch(
      "https://2mo5le7ftthr66mavhn6gbhiay0keida.lambda-url.ca-central-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "email": `${email}`,
          "accesstoken": `${accessToken}`,
        },
        body: JSON.stringify(newUpdatedNote),
      }
    );

    const jsonRes = await res.json();
    console.log(jsonRes);

    navigate(`/notes/${updatedNote.id}`);

  };

  const onEditNote = (id) => {
    navigate(`/notes/${id}/edit`);
  };

  const getActiveNote = (id) => {
    if (activeNote === false) {
      setActiveNote(id)
      return notes.find((note) => note.id === id);
    }
    return notes.find(({ id }) => id === activeNote);
  };

  const clickNote = (noteId) => {
    setActiveNote(noteId);
    navigate(`/notes/${noteId}`)
  };
    
    const getProperNote = (note) => {
      return note.body.substr(0, 20) + "..."
    };

  return (
    <>

      <div class = "header-cont">
        <div class = "header-button">
          <button id = "hide-menu-button" onClick = {handleNotesDisplay}>&#9776;</button>
        </div>
        <div class = "header-title-1">
          <div id = "title"><b>Lotion</b></div>
          <div id = "title-desc"><b>Like Notion, but worse.</b></div>
        </div>
        <div class = "header-title-2">
          <div id = "login-info">👤 Logged in as: {email}</div>
          <button id = "log-out-button" onClick={handleLogout}>✈ Logout ✈</button>
        </div>
      </div>

      <div class = "body-cont">
        <div class = "notes-menu" ref = {notesDisplayRef}>
            <div class = "notes-menu-header">
                <div class = "notes-text"><b>Notes</b></div>
                <button class = "add-note-button" onClick = {onAddNote}>&#43;</button>
            </div>
            <div class = "notes-menu-body" ref = {notesRef}>
                {notes.map((note) => (
                <div class = {`sidebar-note ${note.id === activeNote && "active"}`} onClick = {() => clickNote(note.id)}>
                    <div class = "sidebar-note-title"><strong>{note.title}</strong></div>
                    <small class = "note-date">{new Date(note.lastModified).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                    })}</small>
                    <p dangerouslySetInnerHTML={{__html: getProperNote(note)}}></p>
                 </div>
                ))}
            </div>
        </div>

            <div class = "current-note">
                <Outlet context = {[onDeleteNote, onSaveNote, onEditNote, getActiveNote]}/>
            </div>

        </div>




      <div class = "flex-end">
        <p id = "copyright">&#169; Harris Hasnain 2023</p>
      </div>

    </>
  );

}

export default Layout;
