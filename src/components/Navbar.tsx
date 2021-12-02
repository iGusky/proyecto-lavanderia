import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import { ContaduriaIcon, RealizarVentaIcon, ListarVentasIcon } from './ui/Icons';

const Navbar = (props: any) => {
  // const { children } = props;
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar__logo">LOGO</div>
        <div className="navbar__link-container">


          <Link className="navbar__link-item" to="/">
            <RealizarVentaIcon/>
            <div> Realizar Venta</div>
          </Link>

          <Link className="navbar__link-item" to="/ventas">
            <ListarVentasIcon/>
            <div> Lista Ventas</div>
          </Link>

          <Link className="navbar__link-item" to="/catalogo">
            <svg xmlns="http://www.w3.org/2000/svg" className="navbar__link-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <div> Catalogo Servicios</div>
           </Link>

          <Link className="navbar__link-item" to="/contaduria">
            <ContaduriaIcon/>
            <div>Contaduria</div>
          </Link>
		  <Link className="navbar__link-item" to="/gastos">
            <ContaduriaIcon/>
            <div>Gastos</div>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
