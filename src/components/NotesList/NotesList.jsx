import React, { useState, useEffect, useRef } from 'react'

import NoteItem from '../NoteItem/NoteItem';
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import './style.css'

const NotesList = ({notes, notesTitle, editNote, deleteNote, showAlert, grid, getNotes}) => {
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" })
    const [noteTags, setNoteTags] = useState({ id: "", title: "", description: "", tag: "" })
    

    const ref = useRef(null);
    const refDelete = useRef(null);
    // const firstUseEffectHandler = useRef(true);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }

    const deleteNoteBTN = (currentNote) => {
        refDelete.current.click();
        setNote(currentNote);
    }

    const handleFavourites = (currentNote, newTag) => {
        console.log(newTag)
        setNoteTags({...currentNote, tag:newTag})
    }
    const handleArchive = (currentNote, newTag) => {
        console.log(newTag)
        setNoteTags({...currentNote, tag:newTag})
    }
    const handleTags = () => {
        if(noteTags.id !== "") 
            editNote(noteTags._id, noteTags.title, noteTags.description, noteTags.tag);
    }
        

    useEffect(() => {
      handleTags();   
    //   getNotes() 
    }, [noteTags])
    

    const handleDeleteNote = () => {
        deleteNote(note._id)
        refDelete.current.click();
        showAlert("Note is deleted successfully", "success");
    }

    function onChange(e) {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        // console.log(note)
        editNote(note._id, note.title, note.description, note.tag);
        ref.current.click();
        showAlert("Note is updated successfully!!", "success");

    }
    return (
        <ContentWrapper>
            <div className='noteslist' style={{ margin: "0 auto" }}>
                {/* show modal btn */}

                <div className='updateNodeModal'>
                    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">            </button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body border text-justify">
                                    <form>
                                        <div className="form-group d-flex flex-column">
                                            <label htmlFor="title"><h6>Title</h6></label>
                                            <input type="text" className="form-control w-100" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="emailHelp" placeholder="Title of note" required />
                                        </div>
                                        <div className="form-group d-flex flex-column">
                                            <label htmlFor="description"><h6>Description</h6></label>
                                            <input type="text" className="form-control w-100" id="description" name="description" value={note.description} onChange={onChange} placeholder="Add description here..." required />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button disabled={note.title.length <= 0 || note.description.length <= 0} type="submit" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='deleteNoteModal'>
                    <button
                        type="button"
                        ref={refDelete}
                        className="btn btn-primary d-none"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalDelete"
                    >
                        {/* button to launch delete modal */}
                    </button>

                    <div
                        className="modal fade"
                        id="exampleModalDelete"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Delete Note
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this note?
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button type="button" onClick={handleDeleteNote} className="btn btn-primary">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="list row container py-5">
                    <h2>{notesTitle}</h2>
                    <div className='container '>
                        {(notes.length === 0) && (
                            <div className="no-notes">
                                <p>No notes to display</p>
                                {/* <button className='btn btn-primary'>Add one</button> */}
                            </div>
                        )}
                    </div>
                    {notes.map(note => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} deleteNoteBTN={deleteNoteBTN} showAlert={showAlert} grid={grid} handleFavourites={handleFavourites} handleArchive={handleArchive} />
                    }
                    )}
                </div>
            </div>
        </ContentWrapper>
    )
}

export default NotesList