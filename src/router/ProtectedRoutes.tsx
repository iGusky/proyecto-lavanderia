import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import Catalogo from '../components/Catalogo/Catalogo';

const ProtectedRoutes = () => {
  return (
    <Switch>
      <Suspense fallback={<Spinner />}>
        <Route
          path="/catalogo"
        >
          <Catalogo />
        </Route>
      </Suspense>
    </Switch>
  )
}

export default ProtectedRoutes
