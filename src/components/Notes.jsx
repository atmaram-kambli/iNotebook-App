import React, { useState, useContext, useEffect, useRef } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from '../context/notes/NoteContex';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const [note, setNote] = useState({id:"", title:"", description:"", tag:""})
    const navigate = useNavigate();

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;

    
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }

    function onChange(e) {
        setNote({...note, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        // console.log(note)
        editNote(note._id, note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert("Note is updated successfully!!", "success");
        
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

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
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="emailHelp" placeholder="Title of note" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} placeholder="Add description here..." required />
                </div>
                <div className="form-group ">
                    <label htmlFor="tag">Tags</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder='tags'/>
                </div>
            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length <= 0 || note.description.length <= 0} type="submit" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
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
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
                }
                )}
            </div>
        </>
    )
}

export default Notes