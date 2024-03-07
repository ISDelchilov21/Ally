import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import "../styles/signin.css"
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Loby from "./Loby.jsx"
export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const handleLogin = ()=>{
    if(username.length === 0){
      alert("Email has left the Blanck")
    }
    else if(password.length=== 0){
      alert("Password has left the Blanck")
    }
    else{
      axios.post("http://127.0.0.1:5000/login", {
        UserName:username,
        Password:password
      })
      .then(function(response){
        console.log(response)
        navigate("/loby-classrooms")
      })
      .catch(function(error){
        console.log(error, "error")
        if(error.response.status ===401){
          alert("Invalid credentials")
        }
      })
    }
  }
  return (
    <div className='page'>
      <Navbar/>
        <div className='info'>
          <div className='form-container'>
            <div>
              <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div>
              <input type='password ' placeholder='Passwrod' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
              <button type='submit' onClick={handleLogin}>Submit</button>
            </div>
          </div>
        </div>

      <Footer/>
    </div>
  )
}

