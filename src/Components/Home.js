import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  return (
    <>
      <div className='home-main'>
        <h1>Welcome <br></br> to <br></br>JAYASIRI Pharmacy</h1>
        <br></br>
        <br></br>
        <div>
          <Link to='/chooseuser'>
            <button className='home-button'>Get Started</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
