import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


function Signup(props) {
    const [newUser, setNewUser] = useState({ email: "", name: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("http://localhost:5000/api/auth/createuser", {
        const response = await fetch("https://inotebook-app-backend.vercel.app/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: newUser.email, name: newUser.name, password: newUser.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            // localStorage.setItem('token', json.authToken);
            props.showAlert(json.message, "success");
            navigate("/login");
        }
        else {
            props.showAlert("Invalid Data!! Try again with valid credentials", "danger");
            setNewUser({ email: "", name: "", password: "" })
        }
    }

    const onChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className='signup'>
                <h2>SignUp to <span className='text-info'>iNotebook</span></h2>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn my-3">
                            <i className="fa-solid fa-user fa-2xl" style={{ color: "#74C0FC" }}></i>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <input type="text" id="name" className="fadeIn second" value={newUser.name} onChange={onChange} name="name" placeholder="User Name" required/>
                            <input type="text" id="email" className="fadeIn second" value={newUser.email} onChange={onChange} name="email" placeholder="E-mail" required />
                            <input type="password" id="password" className="fadeIn third" value={newUser.password} onChange={onChange} name="password" placeholder="Password" minLength={4} required />
                            <input type="submit" className="fadeIn fourth" value="Sign Up" />
                        </form>
                        <div id="formFooter">
                            {/* <a className="underlineHover" href="#">Forgot Password?</a> */}
                            <p>Already have an account? <Link className='underlineHover text-primary' to='/login'>Log In</Link></p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;