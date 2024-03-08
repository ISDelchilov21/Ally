import React from 'react'
import "../styles/math.css"
import NavbarRooms from '../components/NavbarRooms/NavbarRooms';
import AccountImage from "../assets/user.png"
export default function Math() {
  return (
    <div className="page">
      <NavbarRooms />
      <div className="chat-container">
        <div className="side-bar">
          <ul>
            <li><img src={AccountImage} alt="Account"/>Ivancho</li>
            <li><img src={AccountImage} alt="Account"/>Ivancho</li>
            <li><img src={AccountImage} alt="Account"/>Ivancho</li>
            <li><img src={AccountImage} alt="Account"/>Ivancho</li>
            <li><img src={AccountImage} alt="Account"/>Ivancho</li>
          </ul>
        </div>
        <div className="chat-main">
        <div class="chat-messages">
					<div class="message">
						<p class="meta">Brad <span>9:12pm</span></p>
						<p class="text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
							repudiandae.
						</p>
					</div>
					<div class="message">
						<p class="meta">Mary <span>9:15pm</span></p>
						<p class="text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
							repudiandae.
						</p>
					</div>
      </div>
          <div className="chat-form-container">
          <img src={AccountImage} alt="Account"/>
          <input type='text' placeholder='Enter a text' className='chat-input' />
          </div>
        </div>
      </div>
    </div>
  )
}

