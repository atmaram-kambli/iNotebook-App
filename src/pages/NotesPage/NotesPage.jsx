import React, { useState, useContext, useEffect } from 'react'
import './style.css'

import { useNavigate } from 'react-router-dom';
import NoteHeader from '../../components/NoteHeader/NoteHeader';
import SideBar from '../../components/SideBar/SideBar';
import AddNote from '../../components/AddNote/AddNote';
import NotesList from '../../components/NotesList/NotesList';
import noteContext from '../../context/notes/NoteContex';
import { Route, Routes } from 'react-router-dom';

const NotesPage = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const handleSideBar = (isOpen) => {
    setIsSideBarOpen(isOpen)
  }
  const { notes, getNotes, editNote, deleteNote } = context;
  const [selectedCatogory, setSelectedCatogory] = useState(1)
  const [allnotes, setAllnotes] = useState([]);
  const [favNotes, setFavNotes] = useState([])
  const [trashNotes, setTrashNotes] = useState([])
  const [archiveNotes, setArchiveNotes] = useState([])
  const [grid, setGrid] = useState("list")

  const changeCategory = (cat) => {
    setSelectedCatogory(cat);
    window.localStorage.setItem('selectedCatogory', cat);
  }

  
  useEffect(() => {
    setSelectedCatogory(JSON.parse(window.localStorage.getItem('selectedCatogory')));
  }, []);


  const handleGrid = () => {
    if (grid === 'list') setGrid('items');
    else setGrid('list')
  }

  const seperateFavouriteNotes = () => {
    const newNotes =  notes.filter((note) => {
      return note.isFavourite;
    })
    setFavNotes(newNotes);
  }
  const seperateTrashNotes = () => {
    const newNotes =  notes.filter((note) => {
      return note.isTrash;
    })
    setTrashNotes(newNotes);
  }
  const seperateArchiveNotes = () => {
    const newNotes =  notes.filter((note) => {
      return note.isArchived;
    })
    setArchiveNotes(newNotes);
  }

  const handleAllnotes= () =>{
    // setAllnotes(notes)
    const newArr = notes.filter((note) => {
      return !note.isTrash && !note.isArchived;
    })
    setAllnotes(newArr)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setProgress(5);
      props.setProgress(75);
      getNotes();
      props.setProgress(100);
    } else {
      navigate("/login");
    };
  }, [])
  
  useEffect(() => {
    seperateFavouriteNotes();
    seperateTrashNotes();
    seperateArchiveNotes();
    
    handleAllnotes();
    getNotes()
  }, [notes])

  useEffect(() => {
    getNotes()
  }, [selectedCatogory])
  

  return (
    // <Router >
    <div className='notesPage'>

      <NoteHeader grid={grid} handleGrid={handleGrid} isSideBarOpen={isSideBarOpen} handleSideBar={handleSideBar} />
      <div className="notesPage-inner">
        <div className="left-sidebar">
          <SideBar isOpen={isSideBarOpen} changeCategory={changeCategory} selectedCatogory={selectedCatogory} />
        </div>
        <div className="right-notes-content">
          { selectedCatogory === 1 && <AddNote />}
          <div className="main-notepage">
            <Routes>
              <Route path='/' element={<NotesList showAlert={props.showAlert} notesTitle={"Your Notes"} notes={allnotes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
              <Route path='/allnotes' element={<NotesList showAlert={props.showAlert} notesTitle={"Your Notes"} notes={allnotes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
              <Route path='/favourites' element={<NotesList showAlert={props.showAlert} notesTitle={"Favourites Notes"} notes={favNotes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
              <Route path='/archive' element={<NotesList showAlert={props.showAlert} notesTitle={"Archive Notes"} notes={archiveNotes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
              <Route path='/trash' element={<NotesList showAlert={props.showAlert} notesTitle={"Trash"} notes={trashNotes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
            
            </Routes>
            {/* <NotesList showAlert={props.showAlert} notesTitle={"Your Notes"} notes={notes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} /> */}
          </div>

        </div>
      </div>
    </div>
    // </Router>
  )
}

export default NotesPage