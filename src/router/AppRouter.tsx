import React from 'react'

import Navbar from '../components/Navbar';
import VentaPage from '../components/Venta/VentaPage';
import ListaVentasPage from '../components/ListaVentas/ListaVentasPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={VentaPage} />
        <Route exact path="/ventas" component={ListaVentasPage} />
      </Switch>
    </Router>
  )
}

export default AppRouter
