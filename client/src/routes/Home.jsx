import React from 'react'
import "../styles/home.css"
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (

    <div className='body'>
      <Navbar/>
      <div className='info-home'>
        <div className='left-div'> 
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi officia pariatur dicta, voluptatibus, eaque accusamus nulla quis tempore impedit odio neque atque temporibus, praesentium voluptas non nobis asperiores numquam aliquam.</p>
        </div>
        <div className='right-div'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi officia pariatur dicta, voluptatibus, eaque accusamus nulla quis tempore impedit odio neque atque temporibus, praesentium voluptas non nobis asperiores numquam aliquam.</p>
        </div>
        <div className='left-div'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi officia pariatur dicta, voluptatibus, eaque accusamus nulla quis tempore impedit odio neque atque temporibus, praesentium voluptas non nobis asperiores numquam aliquam.</p>
        </div>
        <div className='right-div'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi officia pariatur dicta, voluptatibus, eaque accusamus nulla quis tempore impedit odio neque atque temporibus, praesentium voluptas non nobis asperiores numquam aliquam.</p>
        </div>
      </div>
      <Footer/>

    </div>

    
    
  )
}



