import React, {useEffect, useRef, useState} from 'react';
import { DataRouterContext } from 'react-router/dist/lib/context';


export default function ChatPage() {

const [user, setUser] = useState<any>("")
const [createMessage, setCreateMessage] = useState("")
const [messages, setMessages] = useState<{_id: string; username: string; message: string; date: string;}[]>([])

useEffect(() => {
    fetchData()
}, [])

function fetchData() {
    fetch('/page/data', {
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


function logOut() {
    fetch('/auth/logOut', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}




function sendMessage() {
    fetch('/page/sendMessage', {
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
        if (e.key === "Enter" && e.shiftKey == false) {
            sendMessage()
        }
    }
    


  return (
    <>
        <div id="navBar">
            <b><p key="loggedUser"> Logged in as: @{user.username}</p></b>
            <h1 id="header">Chat app</h1>
            <button id="logOutButton" onClick={logOut}>Log out</button>
        </div>
        <div id="contentDiv">
            <div id="messageList">
            {messages && (messages.map((object, index) => {
                return (
                    <>
                        {object.username == user.username ? (
                            <div key={index} className="myMessageDiv">
                                <p className="myMessageP">{object.message}</p>
                                <p className="myMessageInfo">@{object.username} - {object.date}</p>
                            </div>
                        ) : (
                            <div key={index} className="friendsMessageDiv">
                                <p className="friendsMessageP">{object.message}</p>
                                <p className="friendsMessageInfo">@{object.username} - {object.date}</p>
                            </div>
                        )}
                    </>
                )
            }))}
            </div>
            <div id="createMessage">
                <textarea id="messageTextarea" onKeyPress={onEnterPress} value={createMessage} onChange={(e) => setCreateMessage(e.target.value)}/>
                <button id="sendButton" onClick={sendMessage}>Send</button>
            </div>
        </div>
    </>
  )
}
