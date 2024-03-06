import React from 'react'

import "../styles/signin.css"
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Loby from "./Loby.jsx"
export default function SignIn() {
  return (
    <div className='page'>
      <Navbar/>
        <div className='info'>
          <div className='form-container'>
            <div>
              <input type='text' placeholder='Username'></input>
            </div>
            
            <div>
              <input type='password ' placeholder='Passwrod'></input>
            </div>
            <div>
              <button type='submit'>Submit</button>
            </div>
          </div>
        </div>

      <Footer/>
    </div>
  )
}

