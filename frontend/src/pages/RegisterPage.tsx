import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

export default function LoginPage() {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function register() {
        fetch('/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password})
        })
    }

  return (
    <>
        <div id="navBar">
            <h1 id="header">Register</h1>
        </div>
        <div id="contentDiv">
            <form id="loginForm" action="">
                <div id="formDiv">
                    <label htmlFor="name">Username</label>
                    <input name="username" type="text" onChange={(e) => setUsername(e.target.value)} required/>
                    <label htmlFor="name">Email</label>
                    <input name="email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                    <Link to="/login"><button onClick={register}>Login</button></Link>
                    <Link to="/login">Already got an account?</Link>
                </div>
            </form>
        </div>
    </>
  )
}
