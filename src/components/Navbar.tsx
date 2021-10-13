import React from 'react'
import '../styles/Layout.css'

const Navbar = (props: any) => {
  // const { children } = props;
  return (
    <div className="layout">
      <nav className="navbar">
        <ul className="navbar__link-container">
          <li className="navbar__link-item">Inicio</li>
          <li className="navbar__link-item">Venta</li>
          <li className="navbar__link-item">Pedidos</li>
        </ul>
      </nav>
      {/* <div className="content">
        {children}
      </div> */}
    </div>
  )
}

export default Navbar
