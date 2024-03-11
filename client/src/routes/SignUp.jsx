import React, { useState } from 'react'
import axios from "axios"
import "../styles/signup.css"
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [fname, setFname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [city, setCity] = useState("")
  const [school, setSchool] = useState("")
  const [grade, setGrade] = useState("")
  const [userinfo, setUserInfo] = useState("")

  const navigate = useNavigate()

  const handleRegister = () => {
    const userInfoValue = userinfo ? userinfo : "default value"; // Set a default value if userinfo is null
    axios.post("http://127.0.0.1:5000/signup", {
        Fullname: fname,
        Username: username,
        Email: email,
        Password: password,
        City: city,
        School: school,
        Grade: grade,
        UserInfo: userInfoValue
    })
    .then(function(response) {
        console.log(response);
        navigate("/loby-classrooms");
    })
    .catch(function(error) {
        console.log(error, "error");
        if (error.response.status === 401) {
            alert("Invalid credentials");
        }
    });
};

  

  return (
    <div className="page">
      <Navbar />
      <div className="info">
        <div className="form-container">
          <div className="username-fname">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="city-school">
            <div>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="School"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="grade-info">
            <div>
              <input
                type="number"
                className="grade"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="User info"
                value={userinfo}
                onChange={(e) => setUserInfo(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="pass-email">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="password "
                placeholder="Passwrod"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>

          <div>
            <button type="submit" onClick={handleRegister}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

