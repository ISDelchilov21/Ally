import React from 'react'
import "../styles/home.css"
import Navbar from '../components/Navbar/Navbar'

export default function Home() {
  return (

    <div className='body'>
      <Navbar/>
      <div className='info-home'>
        <div className='left-div'> 
        <p>Ally is a web platform designed to assist students in understanding educational material and resolving related problems. It functions as a website where students can ask questions or seek help on specific topics from other registered users, who are also students.</p>
        </div>
        <div className='right-div'>
        <p>The main goal of the project is to create a platform to help high school students.</p>
        </div>
        <div className='left-div'>
        <p>The decision's sub-objectives are to enhance students' knowledge and skills on specific topics, implement a user-friendly "peer-to-peer" communication method, and enable students to learn from others' expertise in subjects they are not studying. The platform is a web application accessible on mobile devices. It includes registration and account cancellation forms.</p>
        </div>
        <div className='right-div'>
        <p>By bringing together all the components in this documentation, the Ally project creates an innovative educational environment, supporting students in their educational process and creating opportunities for mutual learning and knowledge sharing.</p>
        </div>
      </div>
    </div>

    
    
  )
}



