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

          <Link className="navbar__link-item" to="/contaduria">
            <ContaduriaIcon/>
            <div>Contaduria</div>
          </Link>

        </div>
      </nav>
    </div>
  )
}

export default Navbar
