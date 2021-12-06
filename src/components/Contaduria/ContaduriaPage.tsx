import { useEffect, useState } from 'react'
import clienteAxios from '../../api/axios';
import { Ingresos } from '../../interfaces/ingresosInterface';
import Spinner from '../ui/Spinner';
import IngresosPorServicio from './IngresosPorServicio';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';


function ContaduriaPage() {

  const initialValues: Ingresos = {}
  const meses = ["Enero", "Febrero", "Marzo", "Abri", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fecha = new Date();

  const [ingresoMensual, setIngresoMensual] = useState(initialValues);
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state:any) => state);
  const history = useHistory();

  const consultarIngresos = async (mes: String) => {
    
    setLoading(true);
    const result = await clienteAxios.get('https://lavanderia-backend.herokuapp.com/ingresos/mensual', {
      headers: {
        'access-token': token
      }
    });
    if (result) {
      setIngresoMensual(result.data);
    }
    setLoading(false)
  }

  useEffect(() => {
    
    consultarIngresos(meses[fecha.getMonth()]);
  }, [])
  if(!token){
    history.push('/login')
  }
  if (loading) return (<Spinner />)
  return (
    <div className="container">

      <h1>Resumen de Ingresos</h1>
      <IngresosPorServicio />
  
    </div>
  )
}

export default ContaduriaPage
