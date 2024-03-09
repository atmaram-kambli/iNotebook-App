import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContex';


function NoteItem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

    return (
        <>
        <div className='col-md-3 my-2'>
            <div className="card row m-1">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-solid fa-trash-can m-1" onClick={() => deleteNote(note._id)}></i>
                            <i className="fa-solid fa-pen-to-square m-1" onClick={() => {updateNote(note)}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
        </>
    )
}

export default NoteItem