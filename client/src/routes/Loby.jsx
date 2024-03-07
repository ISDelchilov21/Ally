import React from 'react'
import NavbarLoby from '../components/NavbarLoby/NavbarLoby'
import { useNavigate } from 'react-router-dom'
import MathImage from "../assets/math.png"
import "../styles/loby.css"

export default function Loby() {
  const navigate = useNavigate();
  return (
    <div className='page'>
      <NavbarLoby/>
      <div className='boxes'>
        <div className='bulgarian-box' onClick={() => {navigate("/loby-clasrooms/bulgarian")}}>
          <img src={MathImage} alt="Subject"/>
          <div className='content'>
            <h1>Bulgarian</h1>
            <p>Lorem ipsum </p>
          </div>
        </div>
        <div className='math-box' onClick={() => {navigate("/loby-clasrooms/math")}}>
          <img src={MathImage} alt="Subject"/>
          <div className='content'>
            <h1>Math</h1>
            <p>Lorem ipsum </p>
          </div>
        </div>
        <div className='english-box'onClick={() => {navigate("/loby-clasrooms/english")}}>          
          <img src={MathImage} alt="Subject"/>
          <div className='content'>
            <h1>English</h1>
            <p>Lorem ipsum </p>
          </div>
        </div>
      </div>
    </div>
  )
}

