import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import NotesPage from './pages/NotesPage/NotesPage'
import SearchResult from './pages/SearchResult/SearchResult'
import Alert from './components/Alert';
import AddNote from './components/AddNote/AddNote';
import NoteState from './context/notes/NoteState';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

import LoadingBar from 'react-top-loading-bar';

function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 2000);
}
  return (
    <>
      <NoteState>
        <Router>
          {/* <Navbar /> */}
          
          <Header />
          <Alert alert={alert}/>
          <div className="">
          <LoadingBar
            color='#f11946'
            loaderSpeed={1000}
            progress={progress}
            height={3}
          />

          <Routes>  
            <Route path='/' index element={<Home/>} />
            <Route path='/notes/*' element={<NotesPage setProgress={setProgress} showAlert={showAlert}/>} />
            <Route path='/addnote' element={<AddNote showAlert={showAlert}/>} />
            <Route path='/search/:query' element={ <SearchResult showAlert={showAlert} />} />
            <Route path='/login' element={<Login showAlert={showAlert} /> } />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
          <Footer />
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
