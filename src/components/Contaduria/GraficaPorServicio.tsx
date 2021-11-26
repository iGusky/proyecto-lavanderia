import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { Data } from '../../interfaces/ingresosInterface';
import {useEffect} from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface propsInterface {
  data: any
}

const GraficaPorServicio = (props: propsInterface) => {
  const { data } = props;
  const { labels, datasets } = data
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ingesos Mensuales por servicio'
      }
    }
  };
  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <div>
      {
        labels ? (
          <Bar options={options} data={{
            datasets: data?.datasets,
            labels: data?.labels
          }} />
        ) : (<p>Cagando...</p>)
      }
    </div>
  )
}

export default GraficaPorServicio
