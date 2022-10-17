import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function LoginPage() {
    
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function register() {
        await fetch('/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password})
        })
        navigate('/login')
    }


    function onEnterPress(e: any) {
        if (e.key === "Enter" && e.shiftKey === false) {
            register()
        }
    }

  return (
    <>
        <div id="navBar">
            <h1 id="header">Register</h1>
        </div>
        <div id="contentDiv">
                <div id="formDiv">
                    <label htmlFor="name">Username</label>
                    <input onKeyPress={onEnterPress} name="username" type="text" onChange={(e) => setUsername(e.target.value)} required/>
                    <label htmlFor="name">Email</label>
                    <input onKeyPress={onEnterPress} name="email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                    <label htmlFor="password">Password</label>
                    <input onKeyPress={onEnterPress} name="password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                    <button id="loginButton" onClick={register}>Register</button>
                    <Link to="/login">Already got an account?</Link>
                </div>
        </div>
    </>
  )
}
