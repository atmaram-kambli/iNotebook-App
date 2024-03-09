import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
// import Alert from './components/Alert';
// import Login from './components/Login';
// import Signup from './components/Signup';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message={'Welcome to iNotebook'} /> */}
          <div className="container">

          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/about' element={<About />} />
            {/* <Route path='/login' element={<Login /> } />
            <Route path='/signup' element={<Signup />} /> */}
          </Routes>

          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
