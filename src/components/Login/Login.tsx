import clienteAxios from '../../api/axios'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginPassword } from '../../actions/auth';
import { useHistory } from 'react-router';



const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const { token } = useSelector((state: any) => state);
  const history = useHistory();
  const handleChange = (e) => {

    setPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoginPassword(password))
    setPassword('');
  }
  if(token) history.push('/');
  return (
    <div className="container">
      <h1>Inicio de Sesión</h1>
      <h2>Ingrese la contraseña de administrador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Contraseña"
          disabled={
            token ? true : false
          }
        />
        <input
          type="submit"
          value="Iniciar Sesion"
          disabled={
            token ? true : false
          } />
      </form>
    </div>
  )
}

export default Login
