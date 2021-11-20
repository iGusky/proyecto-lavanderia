import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import clienteAxios from '../../api/axios'
import { Ingresos } from '../../interfaces/ingresosInterface'

function IngresosAnuales() {
  const meses = ["Enero", "Febrero", "Marzo", "Abri", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const initialData:any = {
    labels: meses,
    datasets: [{}]
  }
  const ingresosAnualesInitialState: Ingresos[] = []

  const [chartData, setCharData] = useState(initialData);
  const [ingresosAnuales, setIngresosAnuales] = useState(ingresosAnualesInitialState);

  const consultarIngresosAnuales = async () => {
    const {data} = await clienteAxios.get('/ingresos');
    setIngresosAnuales(data);
    guardarData(data);
  }
  const guardarData = (data:any[]) => {
    setCharData({
      ...chartData,
      labels: meses.slice(0, data.length),
      datasets: [
        {
          label: `Ingresos en ${ingresosAnuales[0]?.year}`,
          fill: false,
          lineTension: 0.4,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 5,
          pointHitRadius: 20,
          data: data.map(ingreso => (ingreso.total.toFixed(2)))
        }
      ]
    })
  }

  useEffect(() => {
    consultarIngresosAnuales();
  }, [])
  return (
    <div>
      <Line data={chartData}/>
    </div>
  )
}

export default IngresosAnuales
