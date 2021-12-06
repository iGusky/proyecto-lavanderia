import Swal from "sweetalert2";
import clienteAxios from "../api/axios"
import { ResponseData } from "../interfaces/responseInterface"

export const startLoginPassword = (password:string) => {
  return (dispatch)=> {
    clienteAxios.post<ResponseData>('https://lavanderia-backend.herokuapp.com/auth', {
      user: "administrador",
      password
    }).then( ({data}) => {
      if(data.mensaje === 'Autenticación correcta'){
        Swal.fire({
          icon:"success",
          title: 'Inicio exitoso',
          text: 'Ahora puede acceder a funciones de administrador'
        });
        dispatch( login( data.token ));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Contraseña incorrecta'
        })
      }
      
    }); 
  }
}

export const login = (token:any) => {
  return {
    type: 'login',
    payload: {
      token
    }
  }
}

export const startLogout = () => {
  return (dispatch ) => {
    dispatch(logout())
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada'
    })
  }
}

export const logout = () => {
  return {
    type: 'logout'
  }
}