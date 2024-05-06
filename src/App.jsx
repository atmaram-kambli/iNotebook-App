import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import NotesPage from './pages/NotesPage/NotesPage'
import Alert from './components/Alert';
import AddNote from './components/AddNote/AddNote';
import NoteState from './context/notes/NoteState';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [alert, setAlert] = useState(null);
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

          <Routes>
            <Route path='/' index element={<Home/>} />
            <Route path='/notes' element={<NotesPage showAlert={showAlert}/>} />
            <Route path='/addnote' element={<AddNote showAlert={showAlert}/>} />
            <Route path='/login' element={<Login showAlert={showAlert} /> } />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />
          </Routes>
          <Footer />
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
