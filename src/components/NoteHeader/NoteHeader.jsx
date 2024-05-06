import React from 'react'
import './style.css';
import { SlMenu } from "react-icons/sl";

const NoteHeader = () => {
  return (
    <div className='noteHeader'>
        <div className="first">
          <div className="navi-circle">
            <SlMenu className='navi text-primary'/>
          </div>
          <p>Hi, UserName</p>
        </div>
        <div className="middle">
          <input type="text" placeholder='Search...' />
        </div>
        <div className="right px-2">
            <p>re</p>
            <p>GV</p>
            <p>se</p>
        </div>
    </div>
  )
}

export default NoteHeader