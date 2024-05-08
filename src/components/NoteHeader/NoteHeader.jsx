import React from 'react'
import './style.css';
import { SlMenu } from "react-icons/sl";

const NoteHeader = ({handleGrid}) => {
  
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
            <button className='btn btn-light mx-0' title='Refresh'>re</button>
            <button className='btn btn-light mx-0' title='Grid View' onClick={handleGrid}>GV</button>
            <button className='btn btn-light mx-0' title='Settings'>se</button>
        </div>
    </div>
  )
}

export default NoteHeader