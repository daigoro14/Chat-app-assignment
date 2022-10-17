import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function LoginPage() {
    
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        await fetch('/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        navigate('/')
    }

    
    function onEnterPress(e: any) {
        if (e.key === "Enter" && e.shiftKey === false) {
            login()
        }
    }

  return (
    <>
        <div id="navBar">
            <h1 id="header">Login</h1>
        </div>
        <div id="contentDiv">
            <div id="formDiv">
                    <label htmlFor="name">Username or email</label>
                    <input onKeyPress={onEnterPress} name="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input onKeyPress={onEnterPress} name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={login}>Login</button>
                    <Link to="/register">Register</Link>
                </div>
        </div>
    </>
  )
}