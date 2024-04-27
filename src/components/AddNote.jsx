import React, {useContext, useState, useEffect, memo} from 'react'
import noteContext from '../context/notes/NoteContex';


const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
  
    const [note, setNote] = useState({title:localStorage.getItem("title"), description:localStorage.getItem("desc"), tag:""})

    function onChange(e) {
        setNote({...note, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        
        props.showAlert("New Note is added successfully!!", "success");
        // console.log("clicked")
        setNote({title:"", description:"", tag:""});
        if(localStorage.getItem('title')) {
            localStorage.removeItem('title')
            localStorage.removeItem('desc')
        }
    }

  return (
    <>
        <div className="container">
            <h2>Add a Note</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} aria-describedby="emailHelp" placeholder="Title of note" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} placeholder="Add description here..." required />
                </div>
                <div className="form-group ">
                    <label htmlFor="tag">Tags</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder='tags'/>
                </div>
                <button disabled={note.title.length <= 0 || note.description.length <= 0} type="submit" className="btn btn-primary m-3" onClick={handleSubmit}>Add Note</button>
            </form>
        </div>
    </>
  )
}

export default memo(AddNote)