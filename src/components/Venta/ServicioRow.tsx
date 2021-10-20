import { useEffect, useState } from 'react';
const ServicioRow = (props: any) => {
  const { pedidos, setPedidos, index, data } = props;

  const { servicios } = data;

  const [rowPedido, setRowPedido] = useState({ servicio: '0', tipo: '0', cantidad: '0', unidad: 'Kilos', precioUnitario: 0, subtotal: 0 });

  function handleChangeServicio (e: any) {
    console.log('handleChange');
    setRowPedido({
      ...rowPedido,
      [e.target.name]: e.target.value,
      unidad: e.target.name && e.target.value === '0'  ? 'Kilos' : 'Unidades'
    })
  }
  function handleChangeTipo (e: any) {
    console.log('handleChange');
    setRowPedido({
      ...rowPedido,
      [e.target.name]: e.target.value,
      tipo: servicios[rowPedido.servicio].tipos[e].precio
    })
  }


  return (
    <tr key={index}>
      <td>
        <select
          name={`servicio`}
          value={rowPedido.servicio}
          onChange={(e) => {
            handleChangeServicio(e);
            setTimeout(() => {
              
            }, 300);
            // updateUnidad(e);
          }}
          className="input-field">
          {
            servicios.map((servicio: any) => {
              return <option value={servicio.value} >{servicio.nombre}</option>
            })
          }
        </select>
      </td>
      <td>
        <select
          name={`tipo`}
          value={rowPedido.tipo}
          onChange={(e) => {
            handleChangeTipo(e)
          }}
          className="input-field">
          {
            servicios[rowPedido.servicio].tipos.map((tipo: any) => {
              return <option value={tipo.value}>{tipo.nombre}</option>
            })
          }
        </select>
      </td>
      <td>
        <input
          type="number"
          name={`cantidad`}
          className="input-field"
          value={rowPedido.cantidad}
          onChange={(e) => {
            handleChange(e);
          }
          }

          min='0'
        />
      </td>
      <td>
        {
          // rowPedido.servicio === '0' ? 'Kilos' : 'Unidades'
          rowPedido.unidad
        }
      </td>
      <td>
        {

          `$${servicios[rowPedido.servicio].tipos[rowPedido.tipo].precio}.00`
          // `$${servicios[serviceSelected].tipos[typeSelected].precio}.00`
        }
      </td>
      <td

      >
        {
          rowPedido.subtotal
          // `$${actualRow.subtotal}.00`
        }
      </td>
    </tr>
  )
}

export default ServicioRow
