import React, { useEffect, useState } from 'react';
import "../styles/math.css"
import io from "socket.io-client";

import NavbarRooms from '../components/NavbarRooms/NavbarRooms';
import AccountImage from "../assets/user.png"
export default function Math() {
  const[room,setRoom] = useState("room2")
  const [messages, setMessages] = useState(()=> {
    const savedMessages = localStorage.getItem(`chatMessages_${room}`)
    return savedMessages ? JSON.parse(savedMessages):[]
  });
  const [inputText, setInputText] = useState("");
  
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5000", { transports: ['websocket'] });

    newSocket.on("connect", () => {
      console.log("WebSocket connected successfully.");
      newSocket.emit("join", {room});
    });

    newSocket.on("message", ({message, room:messageRoom}) => {
      if(messageRoom === room){
        setMessages((prevMessages) => {
          const updatedMessages =[...prevMessages, message];
          localStorage.setItem(`chatMessages_${room}`, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
        
      }
    });

    newSocket.on("disconnect", () => {
      console.log("WebSocket disconnected.");
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.off("message");
        newSocket.disconnect();
      }
    };
  }, [room]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", { message: inputText,room:room });
      setInputText("");
    }
  };
  return (
    <div className="page">
      <NavbarRooms setRoom={setRoom}/>
      <div className="chat-container">
        <div className="side-bar">
          <ul>
            <li>
              <img src={AccountImage} alt="Account" />
              Ivancho
            </li>
            <li>
              <img src={AccountImage} alt="Account" />
              Ivancho
            </li>
            <li>
              <img src={AccountImage} alt="Account" />
              Ivancho
            </li>
            <li>
              <img src={AccountImage} alt="Account" />
              Ivancho
            </li>
            <li>
              <img src={AccountImage} alt="Account" />
              Ivancho
            </li>
          </ul>
        </div>
        <div className="chat-main">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div className="message" key={index}>
                <p className="meta">
                  Brad <span>9:12pm</span>
                </p>
                <p className="text">{message}</p>
              </div>
            ))}
          </div>
          <div className="chat-form-container">
            <img src={AccountImage} alt="Account" />
            <input
              type="text"
              placeholder="Enter a text"
              className="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

