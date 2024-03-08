import React from 'react'
import {Link} from "react-router-dom"

import "./navbarrooms.css"
export default function  NavbarRooms() {
  return (
    <div>
      <ul className='navbar'>
        <div className='left-side'>
          <li><Link to="/">ALLY</Link></li>
        </div>
        
        <div className='right-side'>
          <li><Link to="/loby-classrooms">Leave the room</Link></li>
        </div>
        
      </ul>
    </div>
  )
}

