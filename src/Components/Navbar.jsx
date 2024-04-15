import React from 'react'
import '../Style/Navbar.css'
import Logo from '../Assets/logo.jpeg'
export default function Navbar() {
  const date =  Date().slice(4,15);
  const clearStorage = () =>{
    localStorage.clear();
    window.location.reload();
}
  return (
    <>
    <div className="nav-container">
        <span className='nav-logo'>
            <img onClick={()=>{clearStorage()}} src={Logo} alt="" height={100} width={100}/>
        </span>
        <span style={{color:'palegoldenrod',padding:"0px 20px"}}>{date}</span>
    </div>
    </>
  )
}
