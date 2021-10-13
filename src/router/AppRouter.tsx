import React from 'react'

import Navbar from '../components/Navbar';
import VentaPage from '../components/Venta/VentaPage';
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
      </Switch>

    </Router>
  )
}

export default AppRouter
