import React from 'react'
import './style.css'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
        <div className="footer-content">
            <p>CRAFTED WITH PASSION AND PRECISION <span className="hearts">&#10084;</span></p>
            <p>&copy;<span >{currentYear}</span> Atmaram Kambli | Thank you for visiting!</p>
        </div>
    </div>
  )
}

export default Footer