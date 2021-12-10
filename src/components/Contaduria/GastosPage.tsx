import React, { useEffect, useState } from 'react'
import clienteAxios from '../../api/axios';
import { Egresos } from '../../interfaces/egresoInterface';
import Spinner from '../ui/Spinner';
import GastosPorServicio from './GastosPorServicio';
import { DateRangePicker, } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import GraficaPorServicio from './GraficaPorServicio';
import addDays from 'date-fns/addDays'

function GastosPage() {
  const initialValues: Egresos = {}
  const servicios = ["Lavanderia", "Tintoreria", "Cobertores"];
  const dataInitialState: any = {};

  const [servicioSeleccionado, setServicioSeleccionado] = useState(servicios[0]);
  const [data, setData] = useState(dataInitialState);
  const [egreso, setEgreso] = useState(initialValues);
  const [loading, setLoading] = useState(true);

  const [dates, setDates] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }]);

  const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }

  const consultarEgresos = async (from:Date,to:Date) => {
    setLoading(true);
    const result =  await clienteAxios.get('/gastos?from='+from.getTime()+'&to='+to.getTime()+'&tipo='+servicioSeleccionado);
    if(result){
      setEgreso(result.data);
      console.log(egreso);
	  cagarData(result.data);
    }
    setLoading(false)
  }


  const handleChange = (e:any) => {
    setServicioSeleccionado(servicios[e.target.value]);
  }
  const cagarData = (data:Egresos[]) => {
    const tipos: any = [];
    const totales: any = [];
	if (!Array.isArray(data))return;
    data.forEach(element => {
       tipos.push(element.tipo_gasto);
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
    consultarEgresos(dates[0].startDate, dates[0].endDate);
  }, [dates])

  if(loading) return ( <Spinner/> )

  return (
    <div className="container">
      <h1>Resumen de Egresos</h1>
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
	  <DateRangePicker
        ranges={dates}
		onChange={item =>{
			setDates([item.selection])
		}}
      />
    </div>
  )
}

export default GastosPage
