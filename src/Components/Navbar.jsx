import React from 'react'
import '../Style/Navbar.css'
import Logo from '../Assets/logo.jpeg'
export default function Navbar() {
  return (
    <>
    <div className="nav-container">
        <span>
            <img src={Logo} alt="" height={120} width={120}/>
        </span>
    </div>
    </>
  )
}
