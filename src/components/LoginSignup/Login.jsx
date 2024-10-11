import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginSignup.css'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("http://localhost:5000/api/auth/login", {
        const response = await fetch("https://inotebook-app-backend.vercel.app/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Welcome to iNotebook!!", "success");
            navigate("/notes");
        }
        else {
            props.showAlert("Invalid credentials", "danger");
            setCredentials({ email: "", password: "" })
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='login'>

                <h2>Login to <span className='text-info'>iNotebook</span></h2>
                <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn my-3">
                        <i className="fa-solid fa-user fa-2xl" style={{color: "#74C0FC"}}></i>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type="text" id="email" className="fadeIn second" value={credentials.email} onChange={onChange} name="email" placeholder="E-mail" required/>
                        <input type="password" id="password" className="fadeIn third" value={credentials.password} onChange={onChange} name="password" placeholder="Password" minLength={4}/>
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>
                    <div id="formFooter">
                        {/* <a className="underlineHover" href="#">Forgot Password?</a> */}
                        <p>Don't have an account? <Link className='underlineHover text-primary' to='/signup'>Sign Up</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
