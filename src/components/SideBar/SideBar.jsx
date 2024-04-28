import React from 'react'
import './style.css'

const SideBar = () => {
  return (
    <>
      <nav class="sidebar">
        <div class="sidebar-top-wrapper">
          <div class="sidebar-top">
            <a href="#" class="logo_wrapper">
              <img src="assets/astra.svg" alt="Logo" class="logo-small" />
              <span class="hide">Astra</span>
            </a>
          </div>
          <div class="expand-btn"> svg </div>
        </div>
        <div class="search_wrapper">
          <input type="search" placeholder="Search for anything..." />
        </div>
        <div class="sidebar-links">
          <h2>Main</h2>
          <ul>
            <li>
              <a href="#dashboard" title="Dashboard" class="tooltip">
                <span class="link hide">Dashboard</span>
                <span class="tooltip_content">Dashboard</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="sidebar-links bottom-links">
          <h2>Settings</h2>
          <ul>
            <li>
              <a href="#settings" title="Settings" class="tooltip">
                <span class="link hide">Settings</span>
                <span class="tooltip_content">Settings</span>
              </a>
            </li>
            </ul>
        </div>
        <div class="divider"></div>
        <div class="sidebar_profile">
          <div class="avatar wrapper">
            <img class="avatar" src="assets/profile.png" alt="Joe Doe Picture" />
              <div class="online status"></div>
          </div>
          <section class="avatar name hide">
            <div class="user-name">Joe Doe</div>
            <div class="email">joe.doe@atheros.ai</div>
          </section>
          <a href="#logout" class="logout">
          </a>
        </div>
      </nav>
      </>
      )
}

export default SideBar