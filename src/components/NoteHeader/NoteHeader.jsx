import React from 'react'
import './style.css';
import { SlMenu } from "react-icons/sl";

const NoteHeader = ({handleGrid, grid}) => {
  
  return (
    <div className='noteHeader'>
        <div className="first">
          <div className="navi-circle">
            <SlMenu className='navi text-primary'/>
          </div>
          <p>Hi, Creator</p>
        </div>
        <div className="middle">
          <input type="text" placeholder='Search...' title='Search feature is under testing' disabled/>
        </div>
        <div className="right px-2">
            {/* <button className='btn btn-light mx-0' onClick={() => {window.location.reload();}} title='Refresh'><i className="fa-solid fa-arrow-rotate-right"></i></button> */}
            {grid === 'list' && <button className='btn btn-light mx-0' onClick={handleGrid} title='List View'><i className="fa-solid fa-list"></i></button>}
            {grid !== 'list' && <button className='btn btn-light mx-0' onClick={handleGrid} title='Grid View'><i className="fa-solid fa-list"></i></button>}
            <button className='btn btn-light mx-0' title='Settings'><i className="fa-solid fa-gear"></i></button>
        </div>
    </div>
  )
}

export default NoteHeader