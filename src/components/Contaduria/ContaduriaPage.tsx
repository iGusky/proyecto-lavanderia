import React, { useEffect, useState } from 'react'
import clienteAxios from '../../api/axios';
import { Ingresos } from '../../interfaces/ingresosInterface';
import Spinner from '../ui/Spinner';
import IngresosAnuales from './IngresosAnuales';

function ContaduriaPage() {
  const initialValues: Ingresos = {} 
  const meses = ["Enero", "Febrero", "Marzo", "Abri", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fecha = new Date();

  const [ingresoMensual, setIngresoMensual] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const consultarIngresos = async (mes:String) => {
    const result =  await clienteAxios.get('/ingresos/mensual');
    if(result){
      setIngresoMensual(result.data);
      console.log(ingresoMensual)
    }
  }

  useEffect(() => {
    consultarIngresos(meses[fecha.getMonth()]);
  }, [])
  
  if(loading) return ( <Spinner/> )

  return (
    <div className="container">
      <h1>Desde Contaduria</h1>
      <p>Ingresos de {ingresoMensual.mes} de {ingresoMensual.year}</p>
      <h2>{ '$' + ingresoMensual.total?.toFixed(2) }</h2>
      <IngresosAnuales />
    </div>
  )
}

export default ContaduriaPage
