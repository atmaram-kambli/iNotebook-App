import React, { useState, useEffect } from 'react'
import './style.css';
import { SlMenu } from "react-icons/sl";

const NoteHeader = ({handleGrid, grid}) => {
  
  const [username, setUsername] = useState("Creator")

  const token = localStorage.getItem('token');
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  // loggedin user
  useEffect(() => {
    const data = parseJwt(token);
    setUsername(data.user.username);
  }, [])
    
  return (
    <div className='noteHeader'>
        <div className="first">
          <div className="navi-circle">
            <SlMenu className='navi text-primary'/>
          </div>
          <p>Hi, {username}</p>
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
