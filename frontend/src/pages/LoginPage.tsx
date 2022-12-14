import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { url } from '../App'

export default function LoginPage() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')

    async function login() {
        await fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username}),
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
            <h1 id="header">Enter your name</h1>
        </div>
        <div id="contentDiv">
            <div id="formDiv">
                <label htmlFor="name">Username</label>
                <input onKeyPress={onEnterPress} name="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                <button onClick={login}>Login</button>
                <Link to="/register">Register</Link>
            </div>
        </div>
    </>
  )
}