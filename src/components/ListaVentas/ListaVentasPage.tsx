import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pagination from "react-js-pagination";
import "../../styles/Pagination.css";

const baseURL = "https://lavanderia-backend.herokuapp.com/ventas";

export interface Welcome {
  ventas: Venta[];
  totalPages: number;
  currentPage: number;
  totalElements: number;
}

export interface Venta {
  _id: string;
  nombreCliente: string;
  direccionCliente: string;
  telefonoCliente: string;
  pedidos: Pedido[];
  total: number;
  pago: number;
  estadoPago: string;
  estadoEntrega: boolean;
  fechaVenta: string;
  fechaActualizacionVenta: string;
  nota: number;
  __v: number;
}

export interface Pedido {
  servicio: string;
  tipo: string;
  precio: number;
  cantidad: number;
  unidad: string;
  subtotal: number;
  _id: string;
}

const ListaVentasPage = () => {
  /*const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [list, setList] = useState([] as any[]);
  useEffect(() => {
    axios(baseURL)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);*/
  const [actualPage, setActualPage] = useState(1);
  const [listaVentas, setList] = useState([] as unknown as Welcome);
  const [mostrando, setMostrando] = useState("Mostrando pedidos sin entregar");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios({
          url: "https://lavanderia-backend.herokuapp.com/ventas/?state=PAGADO_TOTALMENTE&estadoEntrega=false",
        });
        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setList]);

  const loadData = async (nextPage: number) => {
    try {
      const response = await Axios({
        url: "https://lavanderia-backend.herokuapp.com/ventas?page=" + nextPage,
      });
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const todaData = async () => {
    try {
      const response = await Axios({
        url: "https://lavanderia-backend.herokuapp.com/ventas?page=1",
      });
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sinPagoData = async () => {
    try {
      const response = await Axios({
        url: "https://lavanderia-backend.herokuapp.com/ventas/?state=SIN_PAGO&estadoEntrega=false",
      });
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sinEntregarData = async () => {
    try {
      const response = await Axios({
        url: "https://lavanderia-backend.herokuapp.com/ventas/?state=PAGADO_TOTALMENTE&estadoEntrega=false",
      });
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function handlePageChange(nextPage: number) {
    setActualPage(nextPage);
    loadData(nextPage);
  }

  function handleTodaData() {
    setMostrando("Mostrando todos los pedidos");
    setActualPage(1);
    todaData();
  }

  function handleSinPagoData() {
    setMostrando("Mostrando pedidos sin pagar");
    setActualPage(1);
    sinPagoData();
  }

  function handleSinEntregarData() {
    setMostrando("Mostrando pedidos sin entregar");
    setActualPage(1);
    sinEntregarData();
  }

  const [filtrar, setFiltro] = useState(() => {
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
  });

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function pagar(pago: number, id: string, total: number) {
    Axios.put("https://lavanderia-backend.herokuapp.com/ventas/" + id, {
      total: total,
      pago: total - pago,
      estadoPago: "PAGADO_TOTALMENTE",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    await sleep(1000);
    window.location.reload();
  }

  async function entregar(id: string) {
    Axios.put("https://lavanderia-backend.herokuapp.com/ventas?entregar=" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    await sleep(1000);
    window.location.reload();
  }

  return (
    <div className="container">
      <div>
        <h1>Ventas</h1>
        <button className="myButton" onClick={handleSinEntregarData}>Pendientes de entregar</button> 
        <button className="myButton" onClick={handleSinPagoData}>Pendientes de pago</button> 
        <button className="myButton" onClick={handleTodaData}>Mostrar todos</button>
        <h2>{mostrando}</h2>
        <div>
          <Pagination
            activePage={actualPage}
            itemsCountPerPage={20}
            totalItemsCount={listaVentas.totalElements}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th className="sticky-table-cell">Numero de nota</th>
              <th className="sticky-table-cell2">Fecha</th>
              <th className="sticky-table-cell2">Nombre del cliente</th>
              <th className="sticky-table-cell2">Direccion</th>
              <th className="sticky-table-cell2">Telefono</th>
              <th className="sticky-table-cell">Total de pedido</th>
              <th className="sticky-table-cell">Pagado</th>
              <th className="sticky-table-cell2">Estado del pago</th>
              <th className="sticky-table-cell2">Estado de entrega</th>
              <th className="sticky-table-cell2">Accion</th>
            </tr>
          </thead>
          <tbody>
            {listaVentas.ventas?.map((listValue, index) => (
              <tr key={index}>
                <td>{listValue.nota}</td>
                <td>{listValue.fechaVenta?.substr(0, 10)}</td>
                <td>{listValue.nombreCliente}</td>
                <td>{listValue.direccionCliente}</td>
                <td>{listValue.telefonoCliente}</td>
                <td>{listValue.total}</td>
                <td>{listValue.pago}</td>
                <td>
                  {listValue.estadoPago == "PAGADO_TOTALMENTE"
                    ? "Pagado"
                    : listValue.estadoPago == "PAGADO_PARCIALMENTE"
                    ? "Pagado parcialmente"
                    : "Sin pagar"}
                </td>
                <td>
                  {listValue.estadoEntrega ? "Entregado" : "Sin entregar"}
                </td>
                <td>
                  {listValue.estadoEntrega
                    ? ""
                    : listValue.pago == listValue.total && (
                        <button onClick={() => entregar(listValue._id)}>
                          Entregar
                        </button>
                      )}
                  {listValue.pago < listValue.total && (
                    <button
                      onClick={() =>
                        pagar(listValue.pago, listValue._id, listValue.total)
                      }
                    >
                      Pagar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaVentasPage;
