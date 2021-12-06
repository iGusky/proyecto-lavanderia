import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import Pagination from "react-js-pagination";
import "../../styles/Pagination.css";
import ICatalogo from "../../interfaces/catalogoInterface";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router";

const Catalogo = () => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [listaCatalogo, setList] = useState([] as unknown as ICatalogo[]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState(0);
  const history = useHistory();
  const { token } = useSelector((state:any)=> state);
  if(!token){
    history.push('/login')
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNombre("");
    setTipo("");
    setPrecio(0);
    sessionStorage.removeItem("idEditar");
  };
  const [baseUrl, setBaseUrl] = useState(
    "https://lavanderia-backend.herokuapp.com/catalogos"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios(
          "https://lavanderia-backend.herokuapp.com/catalogos",
          {
            headers: {
              "access-token": token
            }
          }
        );
        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setList]);

  const obtenerCatalogo = async () => {
    try {
      const response = await Axios("https://lavanderia-backend.herokuapp.com/catalogos",
      {
        headers: {
          "access-token": token
        }
      });
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoServicio = async () => {
    try {
      const response = await Axios.post(
        "https://lavanderia-backend.herokuapp.com/catalogos",
        {
          nombre: nombre,
          tipo: tipo,
          precio: precio,
        },
        {
          headers: {
            "access-token": token
          }
        }
      );
      obtenerCatalogo();
    } catch (error) {
      console.log(error);
    }
  };

  const editarServicio = async (id: string) => {
    try {
      const response = await Axios.put(
        "https://lavanderia-backend.herokuapp.com/catalogos/" + id,
        {
          _id: id,
          nombre: nombre,
          tipo: tipo,
          precio: precio,
        },
        {
          headers: {
            "access-token": token
          }
        }
      );
      obtenerCatalogo();
      sessionStorage.removeItem("idEditar");
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("idEditar");
    }
    sessionStorage.removeItem("idEditar");
  };

  const eliminarServicio = async (id: string) => {
    try {
      const response = await Axios.delete(
        "https://lavanderia-backend.herokuapp.com/catalogos/" + id,
        {
          headers: {
            "access-token": token
          }
        }
      );
      obtenerCatalogo();
    } catch (error) {
      console.log(error);
    }
  };

  function updateNombre(evt) {
    setNombre(evt.target.value);
  }

  function updateTipo(evt) {
    setTipo(evt.target.value);
  }

  function updatePrecio(evt) {
    setPrecio(evt.target.value);
  }

  function handleOpenEdit(
    id: string,
    nombre: string,
    tipo: string,
    precio: number
  ) {
    handleOpen();
    setNombre(tipo);
    setTipo(nombre);
    setPrecio(precio);
    sessionStorage.setItem("idEditar", id);
  }

  return (
    <>
      <div className="container">
        <h1>Catalogo</h1>
        <button className="myButton" type="button" onClick={handleOpen}>
          Nuevo Servicio
        </button>
        <div>
          {" "}
          <br />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleClose}>
              <div>
                {sessionStorage.getItem("idEditar") != undefined ? (
                  <h1>Editar servicio</h1>
                ) : (
                  <h1>Nuevo servicio</h1>
                )}
                Introduce el nombre:
              </div>
              <input value={tipo} onChange={updateTipo} />
              <div>
                Introduce el tipo:
                <br />
              </div>
              <input value={nombre} onChange={updateNombre} />
              <div>
                Introduce el precio:
                <br />
              </div>
              <input value={precio} onChange={updatePrecio} />
              <div
                style={{
                  textAlign: "right",
                  padding: 8,
                  margin: "24px -24px -24px -24px",
                }}
              >
                {sessionStorage.getItem("idEditar") != undefined ? (
                  <button
                    className="myButton"
                    onClick={() =>
                      editarServicio(
                        sessionStorage.getItem("idEditar") as string
                      )
                    }
                  >
                    Guardar
                  </button>
                ) : (
                  <button className="myButton" onClick={() => nuevoServicio()}>
                    Crear
                  </button>
                )}
              </div>
            </form>
          </Box>
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Nombre Servicio</th>
              <th>Tipo Servicio</th>
              <th>Precio</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {listaCatalogo.map((item, i) => (
              <tr key={i}>
                <td>{item.tipo}</td>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
                <td>
                  {true ? (
                    <button
                      className="myButton2"
                      onClick={() =>
                        handleOpenEdit(
                          item._id,
                          item.tipo,
                          item.nombre,
                          item.precio
                        )
                      }
                    >
                      Editar
                    </button>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {true ? (
                    <button
                      className="myButton2"
                      onClick={() => eliminarServicio(item._id)}
                    >
                      Eliminar
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Catalogo;
