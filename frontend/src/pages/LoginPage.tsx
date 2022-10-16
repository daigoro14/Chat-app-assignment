import React, {useEffect, useState} from 'react'
import {Link, Navigate} from 'react-router-dom'

export default function LoginPage() {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function login() {
        fetch('/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
    }

  return (
    <>
        <div id="navBar">
            <h1 id="header">Login</h1>
        </div>
        <div id="contentDiv">
            <form id="loginForm" action="">
            <div id="formDiv">
                    <label htmlFor="name">Username or email</label>
                    <input name="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Link to="/"><button onClick={login}>Login</button></Link>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    </>
  )
}