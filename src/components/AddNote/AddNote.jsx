import React, {useContext, useState, useEffect, useRef, memo} from 'react'
import noteContext from '../../context/notes/NoteContex';
import './style.css'
import { useNavigate } from 'react-router-dom'

const AddNote = () => {
    const [onFocused, setOnFocused] = useState(false)
    
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

    const context = useContext(noteContext);
    const {addNote} = context;
    const navigate = useNavigate();
    // console.log(location.pathname)
    const ref = useRef();
  
    const [note, setNote] = useState({title:"", description:"", tag:""})
    // const [note, setNote] = useState({title:localStorage.getItem("title"), description:localStorage.getItem("desc"), tag:""})

    useEffect(() => {
      setOnFocused(false);
      if(localStorage.getItem('title')) {
        setOnFocused(true);
        setNote({ title: localStorage.getItem("title"), description:localStorage.getItem("desc")})
      }
      return () => {
          localStorage.removeItem('title');
          localStorage.removeItem("desc")

      }
    }, [])

    useEffect(() => {
      document.addEventListener('click', closeNoteBox)
      return () => {
          document.removeEventListener('click', closeNoteBox)          
      }
    })
    
    const closeNoteBox = (e) => {
        if(ref.current && !ref.current.contains(e.target)) {
            setOnFocused(false);
        }
    }
    
    function onChange(e) {
        setNote({...note, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
          if(location.pathname === '/') {
            setTitle(note.title)
            setDesc(note.description)
            localStorage.setItem('title', title)
            localStorage.setItem('desc', desc)
            if(!localStorage.getItem("token")) {                      
              navigate("/login");
            } else {
              navigate('/notes')
            }
            return;
          }
          
          addNote(note.title, note.description, note.tag);
        
        // props.showAlert("New Note is added successfully!!", "success");
        // console.log("clicked")
        if(localStorage.getItem('title')) {
            localStorage.removeItem('title')
            localStorage.removeItem('desc')
        }
        handleOnBlur();
        setNote({title:"", description:"", tag:""});
    }

    const handleOnFocus = () => {
        setOnFocused(true)
    }

    const handleOnBlur = () => {
        setOnFocused(false)
    }
  return (
    <>
        <div className="container add-note">
            {/* <h2>Add a Note</h2> */}
            <div className='note-box'>
            <form onSubmit={handleSubmit}>
                    {!onFocused && <input type="text" id="description" name="description" onChange={onChange} onFocus={handleOnFocus} value={note.description} placeholder="Take a note..." required  />}
                    {onFocused && 
                    <div className='note' ref={ref} >
                        <input type="text" id="title" name="title" onChange={onChange} value={note.title} placeholder="Title" required/>
                        <input type="text" id="description" name="description" onChange={onChange} onFocus={handleOnFocus} value={note.description} placeholder="Take a note..." required  />
                        {/* <input type="text"  id="tag" name="tag" value={note.tag} onChange={onChange} placeholder='tags' /> */}
                        <button disabled={note.title.length <= 0 || note.description.length <= 0} type="submit" className="btn btn-success m-1 mx-3">Save Note</button>
                    
                    </div>
                    }
                    
            </form>
                </div>
            
        </div>
    </>
  )
}

export default memo(AddNote)