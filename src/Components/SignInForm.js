import React, {useState} from 'react'
import { Link } from 'react-router-dom';


function SignInForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setfirstName] = useState("")
    const [lastname, setlastName] = useState("")

    const [email, setEmail] = useState("")


    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleFirstNameChange = (evt) => {
        setfirstName(evt.target.value)
    }
    const handleLastNameChange = (evt) => {
        setlastName(evt.target.value)
    }
    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                firstname,
                lastname,
                email
            })
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            props.handleLogin(data.user)
        })
        setUsername("")
        setPassword("")
        setEmail("")
        setfirstName("")
        setlastName("")
    }
    const formDivStyle = {
        position:'absolute',
        margin: "auto",
        padding: "20px",
        width: "80%",
        top:'40%'
    }

  
    
    return(
        <div style={formDivStyle}>
            <h1>Sign Up</h1>
            <form className="ui form" onSubmit={handleSubmit}>
            <input className='name' placeholder='First Name' type='text' name='firstname' value={firstname} onChange={handleFirstNameChange} /><br />
            <input className='name' placeholder='Last Name' type='text' name='lastname' value={lastname} onChange={handleLastNameChange} /><br />
            <input className='email' type='text' placeholder='Email' name='email' value={email} onChange={handleEmailChange} /><br />

                <div className="field">
                    <label>Username</label>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>
                <button type='submit'>Submit</button>

            </form>
            <Link to="/login">Log in</Link>
            <button onClick={props.handleAuthClick} className="ui button">Access Authorized Route</button>
        </div>
    )
}

export default SignInForm