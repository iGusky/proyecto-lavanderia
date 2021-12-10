import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../images/logo.png'
import { ContaduriaIcon, RealizarVentaIcon, ListarVentasIcon, CatalogoIcon } from './ui/Icons';
import LogoutButton from './ui/LogoutButton';
import { useSelector } from 'react-redux';

const Navbar = (props: any) => {
  const { token } = useSelector((state:any)=>state);
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar__logo__container">
          <div className="navbar__logo__image">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="navbar__link-container">


          <NavLink exact className="navbar__link-item" to="/" activeClassName="active">
            <RealizarVentaIcon />
            <div> Realizar Venta</div>
          </NavLink>

          <NavLink className="navbar__link-item" to="/ventas" activeClassName="active">
            <ListarVentasIcon />
            <div> Lista Ventas</div>
          </NavLink>

          <NavLink className="navbar__link-item" to="/catalogo" activeClassName="active">
            <CatalogoIcon />
            <div> Catalogo Servicios</div>
          </NavLink>

          <NavLink className="navbar__link-item" to="/contaduria" activeClassName="active">
            <ContaduriaIcon />
            <div>Contaduria</div>
          </NavLink>

		 <NavLink className="navbar__link-item" to="/gastos" activeClassName="active">
            <ContaduriaIcon />
            <div>Gastos</div>
          </NavLink>

          {
            token && <LogoutButton/>
          }

        </div>
      </nav>
    </div>
  )
}

export default Navbar
