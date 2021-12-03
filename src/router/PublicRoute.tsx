import {
  Route,
  Redirect
} from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest}
      component={(props) => (
        (!isAuthenticated)
          ? (<Component {...props}/>)
          : (<Redirect to="/" />)
      )}
    />   
  )
}

export default PublicRoute
