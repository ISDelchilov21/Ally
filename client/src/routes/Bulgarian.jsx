import React, { useEffect, useState } from "react";
import NavbarRooms from "../components/NavbarRooms/NavbarRooms";
import Send from "../assets/send.png";
import io from "socket.io-client";
import axios from "axios";
import "../styles/bulgarian.css";

export default function Bulgarian() {
    const [room, setRoom] = useState("room1");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${room}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputText, setInputText] = useState("");
  const [socket, setSocket] = useState(null);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    axios
    .get("http://127.0.0.1:5000/usernames")
      .then((response) => {
        console.log("Usernames Response:", response.data);
        setUsernames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching usernames", error);
      });

    const newSocket = io("http://127.0.0.1:5000", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("WebSocket connected successfully.");
      newSocket.emit("join", { room });
    });

    newSocket.on("message", ({ message, room: messageRoom }) => {
      if (messageRoom === room) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          localStorage.setItem(
            `chatMessages_${room}`,
            JSON.stringify(updatedMessages)
          );
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
      if (usernames) {
        socket.emit("message", {
          message: inputText,
          room: room,
        });
      }
      setInputText("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="page">
      <NavbarRooms setRoom={setRoom} />
      <div className="chat-container">
        <div className="side-bar">
          <h1>Users</h1>
          <ul>
            
            {usernames.map((username, index) => (
              <li key={index}>{username}</li>
            ))}
          </ul>
        </div>
        <div className="chat-main">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div className="message" key={index}>
                <p className="meta">
                  Ally's users
                </p>
                <p className="text">{message}</p>
              </div>
            ))}
          </div>
          <div className="chat-form-container">
            <input
              type="text"
              placeholder="Enter a text"
              className="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" onClick={sendMessage}>
              <img src={Send} alt="Send message" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}