import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup'
import Swal from 'sweetalert2'

import ServicioRow from './ServicioRow';

import '../../styles/VentaPage.css'

import dataPrecios from '../../data/precios.json';
import clienteAxios from '../../api/axios';



const VentaPage = () => {
  const pedidoInicial = { servicio: '0', tipo: '0', cantidad: 0, unidad: 'Kilos', precio: 0, subtotal: 0 }
  const [pedidosCantidad, setPedidosCantidad] = useState(0)
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);



  const formik = useFormik({
    initialValues: {
      nombreCliente: '',
      direccionCliente: '',
      telefonoCliente: '',
      pedidos: [pedidoInicial],
      total: 0,
      pago: 0
    },
    validationSchema: Yup.object({
      nombreCliente: Yup.string().required('El nombre es obligatorio')
    }),
    onSubmit: async (values, {resetForm}) => {
      setLoading(true);
      try {
        guardarVenta(values, resetForm);
        setLoading(false);  
      } catch (error) {
        setLoading(false);
        console.error(error)
      }
    }
  })

  const guardarVenta = async (values:any, resetForm: Function) => {
    console.log(values);
    const response = await clienteAxios.post('https://lavanderia-backend.herokuapp.com/ventas', values);
    if(response.status === 200){
      console.log(response);
      if(values.total === values.pago){
        for (let listValue of values.pedidos) { //Aqui se hacen los ingresos de cada servicio, quita los comentarios cuando se arregle lo de mandar los nombres de los servicios
          console.log(listValue.servicio);
          console.log(listValue.tipo);
          console.log(listValue.subtotal);
          /*clienteAxios.put("https://lavanderia-backend.herokuapp.com/ingresos", {
            servicio: listValue.servicio,
            tipo: listValue.tipo,
            monto: listValue.subtotal,
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });*/
        }
      }
      if(values.total !== values.pago){
        console.log('No esta pagado');
      }
      setLoading(false);
      Swal.fire(
        'Exito',
        `Pedido guardado con la nota: ${response.data.nota}`,
        'success'
        );
        resetForm();
    }
  }

  useEffect(() => {
    let auxtotal = 0;
    formik.values.pedidos.forEach(pedido => {
      auxtotal += pedido.subtotal
    });
    setTotal(auxtotal)
    formik.setFieldValue('total', total);
  }, [formik.values])

  if(loading) return (<div className="spinner-container"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>)
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
              formik.values.pedidos.map((value, index) => {
                return (
                  <ServicioRow
                    key={index}
                    formik={formik}
                    index={index}
                    data={dataPrecios}
                  />
                )
              })
            }
          </tbody>
        </table>
        <div className="table-footer">
          <input
            type="button"
            onClick={() => {
              setPedidosCantidad(pedidosCantidad + 1);
              formik.values.pedidos.push(pedidoInicial)
            }}
            className="btn mt-1"
            value="Nuevo"
          />
          <h3 className="ml-3">
            <p>Total: $ {total}</p>
          </h3>

        </div>
        <h2>Pago</h2>
        <div className="input-group">
          <input
            type="number"
            name="pago"
            id="pago"
            min="0"
            max={total}
            className="input-field"
            value={formik.values.pago}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input type="button" onClick={() => formik.handleChange({ target: { name: 'pago', value: total } })} value="Pagar total" className="btn" />
        </div>

        <input type="submit" value="Generar pedido" className="btn" />
      </form>
    </div>
  )
}

export default VentaPage
