import React, { useState } from 'react';
import './Sidebar.css';
import logo from "../../assets/logo.png";

import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, changeCategory, selectedCatogory }) => {
  return (
    <div className="sidebar-container">

    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      

      <ul className="sidebar-list">
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='All Notes'>
          <Link to={"/notes"} onClick={()=>changeCategory(1)}>
            <img src={logo} alt="logo" /> 
            <span className={isOpen ? '' : 'hide'}>iNotebook</span>
          </Link>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'} ${selectedCatogory===1?'active':''}`} title='All Notes'>
        <Link to={"/notes/allnotes"} onClick={()=>changeCategory(1)}>
          <i className="fas fa-sticky-note"></i>
          <span className={isOpen ? '' : 'hide'}>Notes</span>
          </Link>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'} ${selectedCatogory===2?'active':''}`} title='Favourite'>
        <Link to={"/notes/favourites"} onClick={()=>changeCategory(2)}>
          <i className="fas fa-star"></i>
          <span className={isOpen ? '' : 'hide'}>Favourite</span>
          </Link>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'} ${selectedCatogory===3?'active':''}`} title='Archive'>
        <Link to={"/notes/archive"} onClick={()=>changeCategory(3)}>
          <i className="fas fa-archive"></i>
          <span className={isOpen ? '' : 'hide'}>Archive</span>
          </Link>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'} ${selectedCatogory===4?'active':''}`} title='Trash'>
        <Link to={"/notes/trash"} onClick={()=>changeCategory(4)}>
          <i className="fas fa-trash"></i>
          <span className={isOpen ? '' : 'hide'}>Trash</span>
          </Link>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
