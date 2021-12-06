import { useEffect, useState } from 'react';
import Catalogo from '../../interfaces/catalogoInterface';
const ServicioRow = (props: any) => {
  const { formik, index, data, catalogo } = props;
  const [serviciosString, setServiciosString] = useState('Lavanderia');
  const [tipoString, setTipoString] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const actualRow = formik.values.pedidos[index];
  const setServicios = new Set();

  catalogo.forEach(element => {
    setServicios.add(element.tipo)
  });

  const auxArray: any = Array.from(setServicios)
  const arrayServicios = auxArray;

  const arrayTipos = catalogo.filter(element => {
    return element.tipo === serviciosString
  })
  let servicioSeleccionado: Catalogo = {
    __v: 0,
    insumos: [],
    nombre: '',
    tipo: '',
    _id: '',
    precio:0
  };

  arrayTipos.forEach(element => {
    if (element.tipo === serviciosString && element.nombre === tipoString) {
      servicioSeleccionado = element;
      console.log('se cambio el servicio')
      return
    }
  });

  return (
    <tr key={index}>
      <td>
        <select
          name={`pedidos[${index}].servicio`}
          value={actualRow.servicio}
          onChange={(e) => {
            formik.handleChange(e);
            setServiciosString(e.target.value)
            setCantidad(0)
            formik.handleChange({
              target: {
                name: `pedidos[${index}].subtotal`,
                value: 0
              }
            })
            // formik.handleChange({
            //   target: {
            //     name: `pedidos[${index}].subtotal`,
            //     value: servicioSeleccionado.precio * actualRow.cantidad
            //   }
            // })
            formik.handleChange({
              target: {
                name: `pedidos[${index}].unidad`,
                value: e.target.value !== '0' ? 'Unidades' : 'Kilos'
              }
            })
          }}
          onBlur={formik.handleBlur}
          className="input-field">
          {
            arrayServicios.map((servicio: any) => {
              return <option value={servicio} >{servicio}</option>
            })
          }
        </select>
      </td>
      <td>
        <select
          name={`pedidos[${index}].tipo`}
          value={actualRow.tipo}
          onChange={(e) => {
            formik.handleChange({
              target: {
                name: e.target.name,
                value: e.target.value
              }
            });
            setCantidad(0)
            setTipoString(e.target.value)
            formik.handleChange({
              target: {
                name: `pedidos[${index}].subtotal`,
                value: servicioSeleccionado.precio * actualRow.cantidad
              }
            })
            formik.handleChange({
              target: {
                name: `pedidos[${index}].precio`,
                value: servicioSeleccionado.precio
              }
            })

          }}
          onBlur={formik.handleBlur}
          className="input-field">
            <option defaultChecked >---Seleccione un tipo---</option>
          {
            arrayTipos.map((tipo: any) => {
              return <option value={tipo.nombre}>{tipo.nombre}</option>
            })
          }
        </select>
      </td>
      <td>
        <input
          type="number"
          name={`pedidos[${index}].cantidad`}
          className="input-field"
          value={cantidad}
          onChange={(e) => {
            formik.handleChange(e)
            setCantidad(Number(e.target.value))
            formik.handleChange({
              target: {
                name: `pedidos[${index}].subtotal`,
                value: servicioSeleccionado.precio * Number(e.target.value)
              }
            })
            formik.handleChange({
              target: {
                name: `pedidos[${index}].precio`,
                value: servicioSeleccionado.precio
              }
            })
          }
          }
          onBlur={formik.handleBlur}
          min='0'
        />
      </td>
      <td>
        {
          actualRow.unidad
        }
      </td>
      <td>
        {
          `$${servicioSeleccionado.precio.toFixed(2)}`
        }
      </td>
      <td

      >
        {
          `$${(servicioSeleccionado.precio * cantidad).toFixed(2)}`
        }
      </td>
    </tr>
  )
}

export default ServicioRow
