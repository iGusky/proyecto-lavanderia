import {
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {


  return (
    <Route {...rest}
      component={(props) => (
        (isAuthenticated)
          ? (<Component {...props} />)
          : (<Redirect to="/login" />)
      )}
    />
  )
}

export default PrivateRoute
