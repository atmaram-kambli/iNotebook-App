import React, {useState} from 'react'
import ContentWrapper from '../components/ContentWrapper/ContentWrapper'
import tick from '../assets/tick.svg'
import './style.css'

import {useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  return (
    <>
      <ContentWrapper>
        <div className="home-container">
          <div className="home-wrapper">
            <div className="left">
              <div className="info">
                <h1><span className='light-blue'>iNotebook</span> - Your <br />Digital Notebook <br />on the Cloud</h1>
                <p>Your Personalized, Flexible, and Secure Note-Taking App</p> 
              </div>

                <ul>
                  <li><div className='feature'><img src={tick} alt="tick" /><span><b>Personlize</b> - Customize your notes to reflect your unique style and preferences</span></div></li>
                  <li><div className="feature"><img src={tick} alt="tick" /><span><b>Flexible</b> - Enjoy the flexibility to update your notes at any moment</span></div></li>
                  <li><div className="feature"><img src={tick} alt="tick" /><span><b>Secure</b> - Secure your thoughts with password-protected authentication powered by JWT</span></div></li>
                </ul>
                <button className='btn btn-primary my-4' onClick={()=>{!localStorage.getItem("token")?navigate('/login'):navigate('/notes')}}>Get started</button>
            </div>
            <div className="right">
                <div className="note-container">

                <div className="note">
                <h3>Your note here</h3>
                  <form onSubmit={()=>{
                      localStorage.setItem('title', title)
                      localStorage.setItem('desc', desc)
                    if(!localStorage.getItem("token")) {                      
                      navigate("/login");
                    } else {
                      navigate('/addnote')
                    }}}>
                  
                    <input type="text" placeholder='title' name="title" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                    <input type="text" placeholder='description' name="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} required />
                    <input type="submit" value="Save Note"/>
                  </form>
                </div>
                </div>
            </div>
           
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}

export default Home