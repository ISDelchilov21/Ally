import React from 'react'
import {Link} from "react-router-dom"
import "./navbaraccount.css"
export default function  NavbarAccount() {
  return (
    <div>
      <ul className='navbar'>
        <div className='left-side'>
          <li><Link to="/">ALLY</Link></li>
        </div>
        
        <div className='right-side'>
          <li><Link to="/loby-clasrooms/math">Math</Link></li>
          <li><Link to="/loby-clasrooms/bulgarian">Bulgarian</Link></li>
          <li><Link to="/loby-clasrooms/english">English</Link></li>
        </div>
      </ul>
    </div>
  )
}
