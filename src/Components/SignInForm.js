import React, {useState} from 'react'
import { Link } from 'react-router-dom';


function SignInForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")


    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
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
                password
            })
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            props.handleLogin(data.user)
        })
        setUsername("")
        setPassword("")
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
            <input className='name' placeholder='Name' type='text' name='name' value={name} onChange={"handleOnChange"} /><br />
            <input className='email' type='text' placeholder='Email' name='email' value={email} onChange={"handleOnChange"} /><br />

                <div className="field">
                    <label>Username</label>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>
                <input className='filebtn' type='file' name='image' onChange={'handleOnChange'} /><br />

                <button className="ui button" type="submit">Submit</button>
            </form>
            <Link to="/login">Log in</Link>
            <button onClick={props.handleAuthClick} className="ui button">Access Authorized Route</button>

        </div>
    )
}

export default SignInForm