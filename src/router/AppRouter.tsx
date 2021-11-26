import Navbar from '../components/Navbar';
import VentaPage from '../components/Venta/VentaPage';
import ListaVentasPage from '../components/ListaVentas/ListaVentasPage';
import CatalogoPage from '../components/Catalogo/Catalogo';
import ContaduriaPage from '../components/Contaduria/ContaduriaPage';
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
        <Route exact path="/catalogo" component={CatalogoPage} />
        <Route exact path="/contaduria" component={ContaduriaPage}/>
      </Switch>
    </Router>
  )
}

export default AppRouter
