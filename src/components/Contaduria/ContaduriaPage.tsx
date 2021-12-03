import React, { useEffect, useState } from 'react'
import clienteAxios from '../../api/axios';
import { Ingresos } from '../../interfaces/ingresosInterface';
import Login from '../Login/Login';
import Spinner from '../ui/Spinner';
import IngresosPorServicio from './IngresosPorServicio';
import { isLogged } from '../../helpers/session';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router';

interface ResponseData {
  user?: string;
  password?: string;
  mensaje?: string;
  token?: string;
}

function ContaduriaPage() {
  const history = useHistory();
  const initialValues: Ingresos = {}
  const meses = ["Enero", "Febrero", "Marzo", "Abri", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fecha = new Date();

  const [ingresoMensual, setIngresoMensual] = useState(initialValues);
  const [loading, setLoading] = useState(true);

  const consultarIngresos = async (mes: String) => {
    var token: string = ''
    if (sessionStorage.getItem('token')) {
      token = sessionStorage.getItem('token')!;
    }
    setLoading(true);
    const result = await clienteAxios.get('/ingresos/mensual', {
      headers: {
        'access-token': token
      }
    });
    if (result) {
      setIngresoMensual(result.data);
      console.log(ingresoMensual)
    }
    setLoading(false)
  }

  useEffect(() => {
    consultarIngresos(meses[fecha.getMonth()]);
  }, [])

  if (loading) return (<Spinner />)
  return (
    <div className="container">

      <h1>Resumen de Ingresos</h1>
      <IngresosPorServicio />
      {
        // !isLogged() ? (
        //   Swal.fire({
        //     title: 'Acceder',
        //     text: 'Ingrese la contraseña de administrador',
        //     input: 'password',
        //     confirmButtonText: 'Acceder',
        //     showLoaderOnConfirm: true,
        //     preConfirm: async (pass) => {
        //       try {
        //         const { data } = await clienteAxios.post<ResponseData>('/auth', {
        //           user: 'administrador',
        //           password: pass
        //         })
        //         if (data.token) {
        //           sessionStorage.setItem('token', data.token)
        //         }
        //         return data
        //       } catch (error) {
        //         Swal.showValidationMessage(`Error en la peticion ${error}`)
        //       }
        //     },
        //     allowOutsideClick: () => !Swal.isLoading()
        //   })
        //     .then((result) => {
        //       if (result.isConfirmed) {
        //         Swal.fire({
        //           title: `Accesso`,
        //           text: result.value?.mensaje,
        //         })
        //         setTimeout(() => {
        //           history.push('/contaduria')
        //         }, 1000);
        //       }
        //     })
        // ) : (
        //   <IngresosPorServicio/>
        // )
      }


    </div>
  )
}

export default ContaduriaPage
