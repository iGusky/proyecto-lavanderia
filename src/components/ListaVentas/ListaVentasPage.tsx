import React, { useState, useEffect } from "react";
import Axios from "axios";

const ListaVentasPage = () => {
  const [listaVentas, setList] = useState([] as any[]);
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

  return <div className="ListaVentasPage">{}</div>;
};

export default ListaVentasPage;
