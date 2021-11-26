import React, { useState, useEffect } from 'react'
import clienteAxios from '../../api/axios';
import { Data, Ingresos } from '../../interfaces/ingresosInterface';
import GraficaPorServicio from './GraficaPorServicio';


const IngresosPorServicio = () => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const servicios = ["Lavanderia", "Tintoreria", "Cobertores"];

  const initialState: Ingresos[] = [];
  const dataInitialStatate: any = {};

  const [ingresos, setIngresos] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(servicios[0]);
  const [data, setData] = useState(dataInitialStatate);

  const consultarIngresos = async () => {
    setLoading(true);
    const { data } = await clienteAxios.get(`/ingresos/mensual?servicio=${servicioSeleccionado}`);
    await setIngresos(data);
    cagarData(data);
  }
  const handleChange = (e:any) => {
    setServicioSeleccionado(servicios[e.target.value]);
  }
  const cagarData = (data:Ingresos[]) => {
    const tipos: any = [];
    const totales: any = [];
    data.forEach(element => {
       tipos.push(element.tipo);
       totales.push(element.total)
    });
    setData({
      labels: tipos,
      datasets: [{
        label: servicioSeleccionado,
        data: totales,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }]
    })
  }
  useEffect(() => {
    consultarIngresos();
    
    
  }, [servicioSeleccionado])
  return (
    <div className='container'>
      <form>
        <label htmlFor="servicio">Seleccione un servicio </label>
        <select name="servicio" id="servicio" onChange={handleChange}  defaultValue={0}>
          <option value="0">Lavanderia</option>
          <option value="1">Tintoreria</option>
          <option value="2">Cobertores</option>
        </select>
      </form>
      <GraficaPorServicio data={data}/>
    </div>
  )
}

export default IngresosPorServicio
