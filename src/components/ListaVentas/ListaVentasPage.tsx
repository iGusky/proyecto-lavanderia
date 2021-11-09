import React, { useState, useEffect } from "react";
import Axios from "axios";
const baseURL = "https://lavanderia-backend.herokuapp.com/ventas";

export interface Welcome {
  ventas?:        Venta[];
  totalPages?:    number;
  currentPage?:   number;
  totalElements?: number;
}

export interface Venta {
  _id?:              string;
  nombreCliente?:    string;
  direccionCliente?: string;
  telefonoCliente?:  string;
  pedidos?:          Pedido[];
  total?:            number;
  pago?:             number;
  estadoPago?:       string;
  estadoEntrega?:    boolean;
  __v?:              number;
}

export interface Pedido {
  servicio?: string;
  tipo?:     string;
  precio?:   number;
  cantidad?: number;
  unidad?:   string;
  subtotal?: number;
  _id?:      string;
}

const ListaVentasPage = () => {
  /*const [list, setList] = useState([] as any[]);
  useEffect(() => {
    axios(baseURL)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);*/

  const [listaVentas, setList] = useState([] as Welcome);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios({
          url: "https://lavanderia-backend.herokuapp.com/ventas",
        });
        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setList]);

  console.log(listaVentas.ventas);
  const ventas = listaVentas.ventas;
  ventas?.forEach((element) => console.log(element));


  return (
    <div className="container">
      <div>
        <h1>Ventas</h1>
        <table>
        <thead>
            <tr>
              <th>Nombre del cliente</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Total de pedido</th>
              <th>Pagado</th>
              <th>Estado</th>
              <th>Entregado</th>
            </tr>
          </thead>
          <tbody>
        {ventas?.map((listValue, index) => (
          <tr key={index}>
            <td>{listValue.nombreCliente}</td>
            <td>{listValue.direccionCliente}</td>
            <td>{listValue.telefonoCliente}</td>
            <td>{listValue.total}</td>
            <td>{listValue.pago}</td>
            <td>{listValue.estadoPago}</td>
            <td>{listValue.estadoEntrega}</td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaVentasPage;
