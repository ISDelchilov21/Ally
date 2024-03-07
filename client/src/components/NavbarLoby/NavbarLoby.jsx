import React from 'react'
import {Link} from "react-router-dom"
import AccountImage from "../../assets/user.png"
import "./navbarloby.css"
export default function  NavbarLoby() {
  return (
    <div>
      <ul className='navbar'>
        <div className='left-side'>
          <li><Link to="/">ALLY</Link></li>
        </div>
        
        <div className='right-side'>
          <li><Link to="/user-account"><img src={AccountImage} alt="Account"/></Link></li>
        </div>
        
      </ul>
    </div>
  )
}
