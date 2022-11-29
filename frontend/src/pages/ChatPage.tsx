import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { url } from '../App'

export default function ChatPage() {

const navigate = useNavigate()

const [user, setUser] = useState<any>("")
const [createMessage, setCreateMessage] = useState("")
const [messages, setMessages] = useState<{_id: string; username: string; message: string; date: string;}[]>([])

useEffect(() => {
    fetchData()
    scrollDown()
}, [])

function fetchData() {
    fetch(`${url}/page/data`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(async res => res.json())
    // .then(async res => {
    //     res.json()
    //     // console.log(res.status)
    // })
    .then(async data => {
        setMessages(data.messages)
        setUser(data.user)
        
        // console.log(data)
    })
    .catch(error => {
        console.log(error.status)
    })
}


async function logOut() {
    await fetch(`${url}/auth/logOut`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    navigate('/login')
}




function sendMessage() {
    fetch(`${url}/page/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({createMessage})
    })
    setCreateMessage('')
    fetchData()
    }

    function onEnterPress(e: any) {
        if (e.key === "Enter" && e.shiftKey === false) {
            sendMessage()
        }
    }
    
    // const content = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const content = React.useRef<HTMLDivElement>(null)
    
    function scrollDown() {
        // console.log(content.current)
        content.current?.scrollIntoView({block: 'end'})
    }


  return (
    <>
        <div id="navBar">
            <b><p key="loggedUser"> Logged in as: @{user.username}</p></b>
            <h1 id="header">Chat app</h1>
            <button id="logOutButton" onClick={logOut}>Log out</button>
        </div>
        <div id="contentDiv">
            <div ref={content} id="messageList">
            {messages && (messages.map((object) => {
                return (
                    <>
                        {object.username == user.username ? (
                            <div className="myMessageDiv">
                                <p className="myMessageP">{object.message}</p>
                                <p className="myMessageInfo">@{object.username} - {object.date}</p>
                            </div>
                        ) : (
                            <div className="friendsMessageDiv">
                                <p className="friendsMessageP">{object.message}</p>
                                <p className="friendsMessageInfo">@{object.username} - {object.date}</p>
                            </div>
                        )}
                    </>
                )
            }))}
            </div>
            <div id="createMessage">
                <textarea id="messageTextarea"   onKeyPress={onEnterPress} value={createMessage} onChange={(e) => setCreateMessage(e.target.value)}/>
                <button id="sendButton" onClick={sendMessage}>Send</button>
            </div>
        </div>
    </>
  )
}
