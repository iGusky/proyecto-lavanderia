import clienteAxios from '../../api/axios'
import {useState} from 'react';

interface ResponseData {
  user?: string;
  password?: string;
  mensaje?: string;
  token?: string;
}

const Login = () => {
  const [password, setPassword] = useState('');
  const handleChange = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await clienteAxios.post<ResponseData>('/auth', {
      user: "administrador",
      password
    })
   if(data.token){
      sessionStorage.setItem('token',data.token!);
   }
  }
  return (
    <div className="container">
      <h1>Inicio de Sesión</h1>
      <h2>Ingrese la contraseña de administrador</h2>
     <form onSubmit={handleSubmit}>
       <input type="password" name="password" value={password} onChange={handleChange} placeholder="Contraseña" />
       <input type="submit" value="Iniciar Sesion" />
     </form>
    </div>
  )
}

export default Login
