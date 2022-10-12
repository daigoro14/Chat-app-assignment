import React, {useEffect, useState} from 'react';
import styled from "styled-components";


export default function ChatPage() {

console.log('You reached the chat page')

const [message, setMessage] = useState("")
const [messages, setMessages] = useState("")

useEffect(() => {
    fetchData()
}, [])

function fetchData() {
    fetch('/page/data', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {

    })
}

const array = [
    {
        time: "12:00",
        user: "Daigoro",
        message: "Hej this is my message",
    },
    {
        time: "13:00",
        user: "D-ro",
        message: "Hej this is my message",
    },
    {
        time: "19:44",
        user: "D-ro",
        message: "Whaddup cuuuzzzin"
    }
]

const sendMessage = () => {
    console.log(`Sending: ${message}`)
}

  return (
    <>
        <div id="navBar">
            <h1 id="header">Chat app</h1>
        </div>
        <div id="contentDiv">
            <div className="MessageList">
            {/* {
                messages.map(message => {
                return {<Message />}
                })
            } */}
            {array && (array.map((object) => {
                return (
                    <>
                    <p>{object.time}</p>
                    <p>{object.message}</p>
                    <p>{object.user}</p>
                    </>
                )
            }))}
            </div>
            <div id="createMessage">
                <textarea id="messageTextarea" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button id="sendButton" onClick={sendMessage}>Send</button>
            </div>
        </div>
    </>
  )
}
