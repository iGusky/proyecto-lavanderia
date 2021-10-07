import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Venta } from '../interfaces/ventaInterface';


const VentaPage = () => {
  const initialValues: Venta = {
    nombreCliente: '',
    direccionCliente: '',
    telefonoCliente: '',
    pedidos: [{
      servicio: '',
      tipo: '',
      cantidad: '',
      unidad: '',
      precioUnitario: 0,
      subtotal: 0
    }],
    total: 0,
    pago: 0
  }
  const validationSchema = Yup.object({
    nombreCliente: Yup.string().required('El nombre es obligatorio')
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        <form>
          <label>Nombre del cliente</label>
          <Field name="nombreCliente" type="text" />
          <ErrorMessage name="nombreCliente"/>
          <br/>
          <input type="submit" value="Generar Pedido" />
        </form>
      </Formik>
    </div>
  );
}

export default VentaPage
