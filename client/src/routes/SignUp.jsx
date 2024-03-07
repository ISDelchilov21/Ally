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

  const navigate = useNavigate()

  const handleRegister = () =>{
    axios.post("http://127.0.0.1:5000/signup", {
      FullName:fname,
      UserName:username,
      Email:email,
      Password:password
    })
    .then(function(response){
      console.log(response);
      navigate("/loby-classrooms")
    })
    .catch(function(error) {
      console.log(error, "error")
      if(error.response.status ===401){
        alert("Invalid credantials")
      }
    })
  }
  return (

      
    <div className='page'>
        <Navbar/>
        <div className='info'>
          <div className='form-container'>
            <div>
              <input type='text' placeholder='Name' value={fname} onChange={(e) => setFname(e.target.value)}></input>
            </div>  
            <div>
              <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div>
              <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <input type='password ' placeholder='Passwrod' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
              <button type='submit' onClick={handleRegister}>Submit</button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      

  )
}

