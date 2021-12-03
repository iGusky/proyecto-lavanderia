import Navbar from '../components/Navbar';
import VentaPage from '../components/Venta/VentaPage';
import ListaVentasPage from '../components/ListaVentas/ListaVentasPage';
import CatalogoPage from '../components/Catalogo/Catalogo';
import ContaduriaPage from '../components/Contaduria/ContaduriaPage';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import '../styles/AppRouter.css'
import PublicRoute from './PublicRoute';
import { useEffect, useState } from 'react';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import { useDispatch, useSelector } from "react-redux";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const state = useSelector((state: any) => state);
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <Switch>
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/login"
            component={AuthRouter}
          />
          <PublicRoute
            isAuthenticated={isLoggedIn}
            exact path="/"
            component={VentaPage}
          />
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/ventas"
            component={ListaVentasPage}
          />
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/catalogo"
            component={CatalogoPage}
          />
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/contaduria"
            component={ContaduriaPage}
          />

        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
