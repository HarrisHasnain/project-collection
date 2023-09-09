import React, {useState, useRef, useEffect, useCallback} from 'react';
import './index.css';
import {useParams, useOutletContext} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditNote() {

    const {id} = useParams();

    const [onDeleteNote, onSaveNote, onEditNote, getActiveNote] = useOutletContext();

    const activeNote = getActiveNote(id);

    const currDate = new Date(Date.now()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }
    );

    const headerRef = useRef(null);

    const quillRef = useRef(null);

    const dateTimeRef = useRef(null);
    
    const onPressSave = (id) => {
        const title = headerRef.current.value;
        const quillValue = quillRef.current.value.toString();

        const dateAsMs = getDateAsMs(dateTimeRef.current.value);

        onSaveNote({
            ...activeNote,
            title: title,
            body: quillValue,
            lastModified: dateAsMs,
        });
    };

    function getDefaultDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false 
        };
        const formattedDate = now.toLocaleString('en-US', options).replace(',', 'T');
        const year = formattedDate.substring(6, 10)
        const month = formattedDate.substring(0, 2)
        const day = formattedDate.substring(3, 5)
        const time = formattedDate.substring(12, 17)
        const actualString = (year + '-' + month + '-' + day + 'T' + time).toString();
        return actualString;
      }

   const defaultDateTime = getDefaultDateTime();

   function getDateAsMs(timeString) {
        const milliseconds = Date.parse(timeString);
        return milliseconds;
   }

    
    return (
        <>
            <div class = "open-note-edit">
                <div class = "note-header">
                    <div class = "open-note-title">
                        <input type = "text" class = "open-note-header" defaultValue = {activeNote.title} autoFocus maxLength={30} ref = {headerRef}/>
                        <br></br>
                        <input type = 'datetime-local' id = 'date-setter' defaultValue={defaultDateTime} ref = {dateTimeRef}/>
                    </div>
                    <div class = "open-note-buttons">
                        <button id = "save-button" onClick = {() => onPressSave(id)}>&nbsp;Save&nbsp;</button>
                        <button id = "delete-button" onClick = {() => onDeleteNote(id)}>Delete</button>
                    </div>
                </div>

                <div class = "note-toolbar">
                    <ReactQuill theme="snow" placeholder = "Your note here..." preserveWhitespace defaultValue={activeNote.body} ref = {quillRef} style={{ height: "500px" }} />
                </div>


            </div>
        </>

    );
}

export default EditNote;
