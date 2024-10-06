import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import { SlMenu } from "react-icons/sl";

const NoteHeader = ({ handleGrid, grid, isSideBarOpen, handleSideBar }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
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
  const openSearch = () => {
    // setMobileMenu(false);
    setShowSearch(true);
}
  const toggleSidebar = () =>{
    handleSideBar(!isSideBarOpen);
  }

  // loggedin user
  useEffect(() => {
    const data = parseJwt(token);
    setUsername(data.user.username);
  }, [])


  
  const searchQueryHandler = (e) => {
    if(e.key == "Enter" && query.length > 0) {
        navigate(`/search/${query}`)
        setTimeout(() => {
            setShowSearch(false);
        }, 1000)
    }
}

  return (
    <>
    <div className='noteHeader'>
      <div className="first">
        <div className="navi-circle" onClick={toggleSidebar}>
          <SlMenu className='navi text-info' />
        </div>
        <p>Hi, {username?username:"Creater"}</p>
      </div>
      <div className='right-side'>
        <div className="right px-2">
          <button className='btn btn-light mx-0' title='Settings' onClick={openSearch}><i className="fa-solid fa-search"></i></button>
          {/* <button className='btn btn-light mx-0' onClick={() => {window.location.reload();}} title='Refresh'><i className="fa-solid fa-arrow-rotate-right"></i></button> */}
          {grid === 'list' && <button className='btn btn-light mx-0' onClick={handleGrid} title='List View'><i className="fa-solid fa-list"></i></button>}
          {grid !== 'list' && <button className='btn btn-light mx-0' onClick={handleGrid} title='Grid View'><i className="fa-solid fa-list"></i></button>}
          <button className='btn btn-light mx-0' title='Settings'><i className="fa-solid fa-gear"></i></button>
        </div>
      </div>
    </div>
      { showSearch && <div className="searchBar">
            <div className="searchInput">
                <input type="text" placeholder='Search for your notes' onChange={(e) => {setQuery(e.target.value)}} onKeyUp={searchQueryHandler} />
                <button className='btn mx-0' title='Settings' onClick={() => {setShowSearch(false)}}><i className="fa-solid fa-multiply"></i></button>
                {/* <i className="fa-solid fa-multiply" ></i> */}
            </div>
        </div>}
    </>
  )
}

export default NoteHeader
