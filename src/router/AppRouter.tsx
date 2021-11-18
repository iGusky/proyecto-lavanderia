import React from 'react'

import VentaPage from '../components/Venta/VentaPage';
import Login from '../components/Login/Login';
import ListaVentasPage from '../components/ListaVentas/ListaVentasPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/ventaPage" component={VentaPage} />
        <Route exact path="/ventas" component={ListaVentasPage} />
      </Switch>
    </Router>
  )
}

export default AppRouter
