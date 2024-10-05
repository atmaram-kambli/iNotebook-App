import React, { useState } from 'react';
import './Sidebar.css';
import logo from "../../assets/logo.png";

import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <div className="sidebar-container">

    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      

      <ul className="sidebar-list">
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='All Notes'>
          <Link to={"/notes"}>
            <img src={logo} alt="logo" /> 
            <span className={isOpen ? '' : 'hide'}>iNotebook</span>
          </Link>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='All Notes'>
        <Link to={"/notes/allnotes"}>
          <i className="fas fa-sticky-note"></i>
          <span className={isOpen ? '' : 'hide'}>Notes</span>
          </Link>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='Favourite'>
        <Link to={"/notes/favourites"}>
          <i className="fas fa-star"></i>
          <span className={isOpen ? '' : 'hide'}>Favourite</span>
          </Link>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='Archive'>
        <Link to={"/notes/archive"}>
          <i className="fas fa-archive"></i>
          <span className={isOpen ? '' : 'hide'}>Archive</span>
          </Link>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='Trash'>
        <Link to={"/notes/trash"}>
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
