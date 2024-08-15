import React, {useState, useEffect, useContext } from 'react';
import noteContext from '../../context/notes/NoteContex';
import './style.css'

function NoteItem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    // const [grid, setGrid] = useState("lisst")
    // const [height, setHeight] = useState("auto")
    const [width, setWidth] = useState("auto")

    useEffect(() => {
      if(props.grid == 'list') {
        //   setHeight("100%")
          setWidth("700px")
      }
      else {
        setWidth('300px')
      }
    
    }, [props.grid])
    

    return (
        <>
        <div className='noteitem col-md-3 my-2' style={{width, maxWidth:"100%", margin:`0 ${props.grid === 'list'?"auto":""}`}}>
            <div className="card shadow row m-1">
                    <div className="card-body" style={{minHeight:"120px"}}>
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <div className='d-flex gap-2 justify-content-center align-items-center'>
                          <button className='btn border border-info flex-grow-1' onClick={() => {updateNote(note)}}><i className="fa-solid fa-pen-to-square m-1" ></i>Update</button>
                          <button className='btn border border-danger flex-grow-1'  onClick={() => {deleteNote(note._id); props.showAlert("Note is deleted successfully", "success");}}><i className="fa-solid fa-trash-can m-1"></i>Delete</button>
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default NoteItem