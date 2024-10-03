import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <div className="sidebar-container">

    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>

      <h2 className={`sidebar-title ${isOpen ? '' : 'hide'}`}>iNotebook</h2>

      <ul className="sidebar-list">
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='All Notes'>
          <i className="fas fa-sticky-note"></i>
          <span className={isOpen ? '' : 'hide'}>Notes</span>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='Favourite'>
          <i className="fas fa-star"></i>
          <span className={isOpen ? '' : 'hide'}>Favourite</span>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='Archive'>
          <i className="fas fa-archive"></i>
          <span className={isOpen ? '' : 'hide'}>Archive</span>
        </li>
        <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`} title='Trash'>
          <i className="fas fa-trash"></i>
          <span className={isOpen ? '' : 'hide'}>Trash</span>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
