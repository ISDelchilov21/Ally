import React from 'react'
import NavbarLoby from '../components/NavbarLoby/NavbarLoby'
import { useNavigate } from 'react-router-dom'
import MathImage from "../assets/math.png"
import BulgarianImage from "../assets/bulgarian.png"
import EngImage from "../assets/english.png"
import "../styles/loby.css"

export default function Loby() {
  const navigate = useNavigate();
  return (
    <div className='page'>
      <NavbarLoby/>
      <div className='boxes'>
        <div className='bulgarian-box' onClick={() => {navigate("/loby-clasrooms/bulgarian")}}>
          <img src={BulgarianImage} alt="Subject"/>
          <div className='content'>
            <h1>Bulgarian</h1>
            <p>That is a Bulgarian classroom. There you will be able to see conversation about subject</p>
          </div>
        </div>
        <div className='math-box' onClick={() => {navigate("/loby-clasrooms/math")}}>
          <img src={MathImage} alt="Subject"/>
          <div className='content'>
            <h1>Math</h1>
            <p>That is a Math classroom. There you will be able to see conversation about subject</p>
          </div>
        </div>
        <div className='english-box'onClick={() => {navigate("/loby-clasrooms/english")}}>          
          <img src={EngImage} alt="Subject"/>
          <div className='content'>
            <h1>English</h1>
            <p>That is a English classroom. There you will be able to see conversation about subject</p>
          </div>
        </div>
      </div>
    </div>
  )
}

