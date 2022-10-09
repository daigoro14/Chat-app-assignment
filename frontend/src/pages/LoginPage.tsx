import React from 'react'

export default function LoginPage() {
  return (
    <>
        <div id="navBar">
            <h1 id="header">Login</h1>
        </div>
        <div id="contentDiv">
            <form id="loginForm" action="">
                <label htmlFor="name">Username or email</label>
                <input name="name" type="text" />
                <label htmlFor="password">Password</label>
                <input type="text" />
                <button>Login</button>
            </form>
        </div>
    </>
  )
}
