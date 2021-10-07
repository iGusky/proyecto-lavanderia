export interface Venta {
  nombreCliente:     string;
  direccionCliente:  string;
  telefonoCliente:   string;
  pedidos:           [Pedido];
  total:             number;
  pago:              number;
}

export interface Pedido {
  servicio:          string;
  tipo:              string;
  cantidad:          string;
  unidad:            string;
  precioUnitario:    number;
  subtotal:          number;
}