import React, {useState} from 'react'
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import NoteHeader from '../../components/NoteHeader/NoteHeader';
// import Notes from '../../components/Notes';

import './style.css'
// import SideBar from '../../components/SideBar/SideBar';
import AddNote from '../../components/AddNote/AddNote';
import NotesList from '../../components/NotesList/NotesList';
// import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const NotesPage = (props) => {
  const [grid, setGrid] = useState("list")
  const handleGrid = () => {
    if(grid === 'list') setGrid('items');
    else setGrid('list')
  }

  return (
      // <Router >

        <div className='notesPage'>
            <NoteHeader grid={grid} handleGrid={handleGrid} />
            <AddNote/>
            <div className="main-notepage">
            {/* <SideBar /> */}
            <NotesList showAlert={props.showAlert} grid={grid} />

            </div>
            {/* <Routes>
              <Route  />
            </Routes> */}
      {/* </Router> */}
        </div>
  )
}

export default NotesPage