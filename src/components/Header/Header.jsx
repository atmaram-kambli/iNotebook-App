import React, { useState, useEffect } from "react";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.css";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/logo.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [displayProfile, setDisplayProfile] = useState('none')

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])
    
    const controlNavbar = () => {
        if(window.scrollY > 200) {
            if(window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide")
            } else {
                setShow("show")
            }
        } else {
            setShow("top")
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
      window.addEventListener('scroll', controlNavbar);
      return () => {
          window.removeEventListener('scroll', controlNavbar);
      }
    }, [lastScrollY])
    
    const opemMobileMenu = () => {
        setMobileMenu(true);
    }

    const navigationHandler = (type) => {
        if(type === 'login') {
            navigate("/login");
        }
        else if(type === 'home') {
            navigate("/")
        }
        else if(type === 'notes') {
            navigate("/notes")
        }
        else {
            navigate("/signup")
        }
        setMobileMenu(false);
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        if(localStorage.getItem('title')) {
            localStorage.removeItem('title');
            localStorage.removeItem('desc');
        }
        navigate('/');
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" />
                    <h2>iNotebook</h2>
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("home")}>Home</li>
                    <li className="menuItem" onClick={() => {!localStorage.getItem("token")?navigationHandler("login"):navigationHandler("notes")}}>Notes</li>
                    {
                        !localStorage.getItem("token") ? (
                            <>
                                
                             <li className="menuItem" onClick={() => navigationHandler("login")}>Log in</li>
                             <li className="menuItem" onClick={() => navigationHandler("signup")}>Sign up</li>
                            </>
                        ):(
                            <>

                            <li className="profile">
                                <div className="menuItem" role="button" onClick={() => {displayProfile==='none'?setDisplayProfile('flex'):setDisplayProfile('none')}}><button className='btn btn-light mx-0 border border-info' title='profile'><i className="fa-solid fa-user"></i></button></div>
                                <div className={`profile-container d-${displayProfile} gap-2`}><ul>
                                    <li><div className="d-flex align-items-center gap-2" role="button">
                                        <i className="fa-regular fa-user"></i>
                                        <div>My account</div>
                                    </div></li>
                                    <li onClick={handleLogOut} role='button'>
                                        <div className="d-flex align-items-center gap-2" role="button">
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <div>Sign out</div>
                                    </div></li>                                
                                </ul></div>
                            </li>
                            </>
                        )
                    }
                    
                                    </ul>
                <div className="mobileMenuItems">
                    { mobileMenu ? (<VscChromeClose onClick={() => {setMobileMenu(false)}} />) : (<SlMenu onClick={opemMobileMenu}/>) }
                </div>
            </ContentWrapper>
        </header>
    );
};

export default Header;