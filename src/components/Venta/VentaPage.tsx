import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup'
import ServicioRow from './ServicioRow';

import '../../styles/VentaPage.css'

import data from '../../data/precios.json';

const VentaPage = () => {
  const pedidoInicial = { servicio: '0', tipo: '0', cantidad: 0, unidad: 'Kilos', precioUnitario: 0, subtotal: 0 }
  const [pedidos, setPedidos] = useState([ pedidoInicial ])
  const [pedidosCantidad, setPedidosCantidad] = useState(0)
  const [total, setTotal] = useState(0);


 

  const formik = useFormik({
    initialValues: {
      nombreCliente: '',
      direccionCliente: '',
      telefonoCliente: '',
      pago: 0
    },
    validationSchema: Yup.object({
      nombreCliente: Yup.string().required('El nombre es obligatorio')
    }),
    onSubmit: (values) => console.log(values)
  })
  return (
    <div className="container">
      <h1>Venta</h1>
      <form
        onSubmit={formik.handleSubmit}
      >
        <h2>Datos del cliente</h2>
        <div className='input-group'>
          <input
            type="text"
            name="nombreCliente"
            placeholder="Nombre del cliente"
            className='input-field'
            value={formik.values.nombreCliente}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className='input-group'>
          <input
            type="text"
            name="direccionCliente"
            placeholder="Dirección del cliente"
            className='input-field'
            value={formik.values.direccionCliente}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className='input-group'>
          <input
            type="text"
            name="telefonoCliente"
            placeholder="Teléfono del cliente"
            className='input-field'
            value={formik.values.telefonoCliente}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <h2>Datos del servicio</h2>
        <table>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Precio unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              pedidos.map((value, index) => {
                return (
                  <ServicioRow
                    key={index}
                    pedidos={pedidos}
                    setPedidos={setPedidos}
                    index={index}
                    data={data}
                  />
                )
              })
            }
          </tbody>
        </table>
        <h3>
          Total: ${total}
        </h3>
        <input
          type="button"
          onClick={() => {
            setPedidosCantidad(pedidosCantidad + 1);
            setPedidos([...pedidos, pedidoInicial])
          }}
          className="btn float-right mt-1"
          value="Nuevo"
        />
        <h2>Pago</h2>
        <div className="input-group">
          <input
            type="number"
            name="pago"
            id="pago"
            min="0"
            className="input-field"
            value={formik.values.pago}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <input type="submit" value="Generar pedido" className="btn" />
      </form>
    </div>
  )
}

export default VentaPage
