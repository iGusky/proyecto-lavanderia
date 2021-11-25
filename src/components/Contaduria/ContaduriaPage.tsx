import React, { useEffect, useState } from 'react'
import clienteAxios from '../../api/axios';
import { Ingresos } from '../../interfaces/ingresosInterface';
import Spinner from '../ui/Spinner';
import IngresosPorServicio from './IngresosPorServicio';

function ContaduriaPage() {
  const initialValues: Ingresos = {} 
  const meses = ["Enero", "Febrero", "Marzo", "Abri", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fecha = new Date();

  const [ingresoMensual, setIngresoMensual] = useState(initialValues);
  const [loading, setLoading] = useState(true);

  const consultarIngresos = async (mes:String) => {
    setLoading(true);
    const result =  await clienteAxios.get('/ingresos/mensual');
    if(result){
      setIngresoMensual(result.data);
      console.log(ingresoMensual)
    }
    setLoading(false)
  }

  useEffect(() => {
    consultarIngresos(meses[fecha.getMonth()]);
  }, [])
  
  if(loading) return ( <Spinner/> )

  return (
    <div className="container">
      <h1>Resumen de Ingresos</h1>
      <IngresosPorServicio/>
      
    </div>
  )
}

export default ContaduriaPage
