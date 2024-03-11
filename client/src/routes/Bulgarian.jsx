import React, { useEffect, useState } from "react";
import NavbarRooms from "../components/NavbarRooms/NavbarRooms";
import AccountImage from "../assets/user.png";
import Send from "../assets/send.png";
import io from "socket.io-client";
import axios from "axios";
import "../styles/bulgarian.css";

export default function Bulgarian() {
    const [room, setRoom] = useState("room3");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${room}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputText, setInputText] = useState("");
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/users")
      .then((response) => {
        setUsername(
          response.data.reduce((acc, user) => {
            acc[user.id] = user.username;
            return acc;
          }, {})
        );
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
      const senderUsername = "User1";
      socket.emit("message", {
        message: inputText,
        room: room,
        username: senderUsername,
      });
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
          <ul>
            <h1>Users</h1>
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
                  {console.log("Username:", username)}
                  {console.log("Message:", message)}
                  {(username &&
                    message.username &&
                    username[message.username]) ||
                    "Loading.."}
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