import React, {useState, useRef, useEffect} from 'react';
import './index.css';
import {useParams, useOutletContext} from 'react-router-dom';

function SavedNote() {

    const {id} = useParams();

    const [onDeleteNote, onSaveNote, onEditNote, getActiveNote] = useOutletContext();

    const activeNote = getActiveNote(id);
    
    const newDate = new Date(activeNote.lastModified).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })

    var body = activeNote.body;

    if (body === '') {
        body = '...'
    }

    return (
        <>
            <div class = "open-note-edit">
                <div class = "note-header" style={{ borderBottom: '0.5px solid grey' }}>
                    <div class = "open-note-title">
                        <div class = "open-note-header"><b>{activeNote.title}</b></div>
                        <div class = "open-note-date">{newDate}</div>
                    </div>
                    <div class = "open-note-buttons">
                        <button id = "edit-button" onClick = {() => onEditNote(id)}>&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>
                        <button id = "delete-button" onClick = {() => onDeleteNote(id)}>Delete</button>
                    </div>
                </div>

                <div class = "saved-note" dangerouslySetInnerHTML={{__html: body}}></div>

            </div>
        </>

    );
}

export default SavedNote;
