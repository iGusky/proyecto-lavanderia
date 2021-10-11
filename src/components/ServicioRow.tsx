import { useState } from 'react';
const ServicioRow = (props: any) => {
  const { formik, index, data } = props;
  const [serviceSelected, setServiceSelected] = useState(0);
  const [typeSelected, setTypeSelected] = useState(0);
  const { servicios } = data;
  console.log(servicios[serviceSelected].tipos)

  return (
    <tr key={index}>
      <td>
        <select
          name={`pedidos[${index}].servicio`}
          value={formik.values.pedidos[index].servicio}
          onChange={(e)=>{
            formik.handleChange(e);
            setServiceSelected(Number(e.target.value));
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
          value={formik.values.pedidos[index].tipo}
          onChange={(e)=>{
            formik.handleChange(e);
            setTypeSelected(Number(e.target.value))
          }}
          onBlur={formik.handleBlur}
          className="input-field">
          {
            servicios[serviceSelected].tipos.map((tipo:any) => {
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
          value={formik.values.pedidos[index].cantidad}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
      </td>
      <td>
        {
          formik.values.pedidos[index].servicio === 'lavanderia' ? 'Kg' : 'Unidades'
        }
      </td>
      <td>
        {
          `$${servicios[serviceSelected].tipos[typeSelected].precio}.00`
        }
      </td>
      <td>
        {
          `$${servicios[serviceSelected].tipos[typeSelected].precio * formik.values.pedidos[index].cantidad}.00`
        }
      </td>
      {/* <td>
      <input type="button" onClick={() => {
          formik.values.pedidos.push({
            servicio: '',
            tipo: '',
            cantidad: '',
            unidad: '',
            precioUnitario: 0,
            subtotal: 0
          })
          console.log(formik.values)
        }} value="Nuevo" />
      </td> */}
    </tr>
    
  )
}

export default ServicioRow
