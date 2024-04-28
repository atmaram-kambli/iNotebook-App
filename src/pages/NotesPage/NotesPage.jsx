import React from 'react'
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import NoteHeader from '../../components/NoteHeader/NoteHeader';
import Notes from '../../components/Notes';
import './style.css'
import SideBar from '../../components/SideBar/SideBar';
import AddNote from '../../components/AddNote/AddNote';
// import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const NotesPage = () => {
  return (
      // <Router >

        <div className='notesPage'>
            <NoteHeader/>
            <AddNote/>
            <div className="main-notepage">
            {/* <SideBar /> */}
            <Notes className="notes"/>

            </div>
            {/* <Routes>
              <Route  />
            </Routes> */}
      {/* </Router> */}
        </div>
  )
}

export default NotesPage