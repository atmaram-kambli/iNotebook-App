import React, { useState, useContext, useEffect, useRef } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from '../context/notes/NoteContex';

function Notes() {
    const [note, setNote] = useState({id:"", title:"", description:"", tag:""})

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }
    useEffect(() => {
        getNotes()
        console.log("notes")
        // eslint-disable-next-line
    }, [])

    function onChange(e) {
        setNote({...note, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        // console.log(note)
        editNote(note._id, note.title, note.description, note.tag);
        ref.current.click();
    }

    return (
        <>
            <AddNote />

            {/* show modal btn */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="emailHelp" placeholder="Title of note" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} placeholder="Add description here..." />
                </div>
                <div className="form-group ">
                    <label htmlFor="tag">Tags</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder='tags'/>
                </div>
            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row container">
                <h2>Your Notes</h2>
                <p className='contaiver'>
                {(notes.length === 0) && `No notes to display`}
                </p>
                {notes.map(note => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                }
                )}
            </div>
        </>
    )
}

export default Notes