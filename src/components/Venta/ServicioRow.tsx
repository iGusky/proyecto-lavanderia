import { useEffect, useState } from 'react';
const ServicioRow = (props: any) => {
  const { formik, index, data } = props;

  const [serviceSelected, setServiceSelected] = useState(0);
  const [typeSelected, setTypeSelected] = useState(0);

  const { servicios } = data;
  const actualRow = formik.values.pedidos[index];

  useEffect(() => {
    console.log('redibujando...')
    // formik.values.pedidos.forEach(pedido => {
    //   console.log(pedido.subtotal);
    // });
  }, [])


  return (
    <tr key={index}>
      <td>
        <select
          name={`pedidos[${index}].servicio`}
          value={actualRow.servicio}
          onChange={(e) => {
            formik.handleChange(e);
            setServiceSelected(Number(e.target.value));
            formik.handleChange({target: {
              name: `pedidos[${index}].unidad`,
              value: e.target.value !== '0' ? 'Unidades' : 'Kilos'
            }})
          }}
          onBlur={formik.handleBlur}
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
          name={`pedidos[${index}].tipo`}
          value={actualRow.tipo}
          onChange={(e) => {
            formik.handleChange(e);
            setTypeSelected(Number(e.target.value))
            formik.handleChange({target: {
              name: `pedidos[${index}].subtotal`,
              value: servicios[serviceSelected].tipos[Number(e.target.value)].precio * actualRow.cantidad
            }})
          }}
          onBlur={formik.handleBlur}
          className="input-field">
          {
            servicios[serviceSelected].tipos.map((tipo: any) => {
              return <option value={tipo.value}>{tipo.nombre}</option>
            })
          }
        </select>
      </td>
      <td>
        <input
          type="number"
          name={`pedidos[${index}].cantidad`}
          className="input-field"
          value={actualRow.cantidad}
          onChange={(e) => {
            formik.handleChange(e)
            formik.handleChange({target: {
              name: `pedidos[${index}].subtotal`,
              value: servicios[serviceSelected].tipos[typeSelected].precio * Number(e.target.value)
            }})
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
          `$${servicios[serviceSelected].tipos[typeSelected].precio}.00`
        }
      </td>
      <td
        
      >
        {
          `$${actualRow.subtotal}.00`
        }
      </td>
    </tr>
  )
}

export default ServicioRow
