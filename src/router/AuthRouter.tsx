import { Redirect, Route, Switch } from 'react-router-dom'
import Login from '../components/Login/Login'
const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </div>
  )
}

export default AuthRouter
