const ServicioRow = (props: any) => {
  const { formik, index } = props;
  return (
    <tr key={index}>
      <td>
        <select
          name={`pedidos[${index}].servicio`}
          value={formik.values.pedidos[index].servicio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field">
          <option value="lavanderia">Lavanderia</option>
          <option value="tintoreria">Tintoreria</option>
          <option value="sabanas">Sabanas</option>
        </select>
      </td>
      <td>
        <select
          name={`pedidos[${index}].tipo`}
          value={formik.values.pedidos[index].tipo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field">
          <option value="express">Express</option>
          <option value="normal">Normal</option>
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
        Kilogramos
      </td>
      <td>
        {
          index
        }
      </td>
      <td>
        $48.00
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
