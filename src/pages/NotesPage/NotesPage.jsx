import React, { useState, useContext, useEffect } from 'react'
import './style.css'

import { useNavigate } from 'react-router-dom';
import NoteHeader from '../../components/NoteHeader/NoteHeader';
import SideBar from '../../components/SideBar/SideBar';
import AddNote from '../../components/AddNote/AddNote';
import NotesList from '../../components/NotesList/NotesList';
import noteContext from '../../context/notes/NoteContex';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const NotesPage = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const handleSideBar = (isOpen) => {
    setIsSideBarOpen(isOpen)
  }
  const { notes, getNotes, editNote, deleteNote } = context;

  const [grid, setGrid] = useState("list")
  const handleGrid = () => {
    if (grid === 'list') setGrid('items');
    else setGrid('list')
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setProgress(5);
      getNotes();
      props.setProgress(75);
      props.setProgress(100);
    } else {
      navigate("/login");
    };
  }, [])

  return (
    // <Router >


    <div className='notesPage'>

      <NoteHeader grid={grid} handleGrid={handleGrid} isSideBarOpen={isSideBarOpen} handleSideBar={handleSideBar} />
      <div className="notesPage-inner">
        <div className="left-sidebar">
          <SideBar isOpen={isSideBarOpen} />
        </div>
        <div className="right-notes-content">
          <AddNote />
          <div className="main-notepage">
            <Routes>
              <Route path='/' element={<NotesList showAlert={props.showAlert} notesTitle={"Your Notes"} notes={notes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
              <Route path='/allnotes' element={<NotesList showAlert={props.showAlert} notesTitle={"Your Notes"} notes={notes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
              <Route path='/favourites' element={<NotesList showAlert={props.showAlert} notesTitle={"Favourites Notes"} notes={notes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
              <Route path='/archive' element={<NotesList showAlert={props.showAlert} notesTitle={"Archive Notes"} notes={notes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
              <Route path='/trash' element={<NotesList showAlert={props.showAlert} notesTitle={"Trash"} notes={notes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />} />
            
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