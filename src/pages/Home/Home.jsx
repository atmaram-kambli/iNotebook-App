import React, {useState, useEffect, useRef} from 'react'
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import tick from '../../assets/tick.svg'
import './style.css'

import {useNavigate} from 'react-router-dom'
// import AddNote from '../../components/AddNote/AddNote'

const Home = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  
  const [onFocused, setOnFocused] = useState(false)
  const ref = useRef();

  useEffect(() => {
    document.addEventListener('click', closeNoteBox)
    return () => {
        document.removeEventListener('click', closeNoteBox)          
    }
  })

  const closeNoteBox = (e) => {
    if(ref.current && !ref.current.contains(e.target)) {
        setOnFocused(false);
      }
}

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
                {/* <div className="note-container"> */}

                <div className="note"> 
                <h2>Your note here</h2>
                <div className='note-box'>
                <form onSubmit={()=>{
                      localStorage.setItem('title', title)
                      localStorage.setItem('desc', desc)
                    if(!localStorage.getItem("token")) {                      
                      navigate("/login");
                    } else {
                      navigate('/notes')
                    }}}>
                    {!onFocused && <input type="text" id="description" name="description" onChange={(e)=>setTitle(e.target.value)} onFocus={()=>{setOnFocused(true)}} value={desc} placeholder="Take a note..." required  />}
                    {onFocused && 
                    <div className='note-item' ref={ref} >
                        <input type="text" id="title" placeholder='Title' name="title" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                        <input type="text" id="description" placeholder='Take a note..' name="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} autoFocus={onFocused?true:false} required />
                    {/* <input type="submit" value="Save Note"/> */}
                        {/* <input type="text"  id="tag" name="tag" value={note.tag} onChange={onChange} placeholder='tags' /> */}
                        <button disabled={title.length <= 0 || desc.length <= 0} type="submit" className="btn btn-success m-1 mx-3">Save Note</button>
                    
                    </div>
                    }
                    
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