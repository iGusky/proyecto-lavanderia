import Navbar from '../components/Navbar';
import VentaPage from '../components/Venta/VentaPage';
import ListaVentasPage from '../components/ListaVentas/ListaVentasPage';
import CatalogoPage from '../components/Catalogo/Catalogo';
import ContaduriaPage from '../components/Contaduria/ContaduriaPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import '../styles/AppRouter.css'
import Login from '../components/Login/Login';
import PublicRoute from './PublicRoute';
import { useEffect, useState } from 'react';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if(sessionStorage.getItem('token')){ 
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn])
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <Switch>
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/login"
            component={AuthRouter}
            setIsLoggedIn={setIsLoggedIn}
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
          <PrivateRoute
            isAuthenticated={isLoggedIn}
            path="/catalogo"
             component={CatalogoPage}
          />
          <PrivateRoute
            isAuthenticated={isLoggedIn}
            path="/contaduria" 
            component={ContaduriaPage}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
