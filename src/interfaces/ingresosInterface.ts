export interface Ingresos {
  _id?:                string;
  mes?:                string;
  year?:               number;
  servicio?:           string;
  tipo?:               string;
  total?:              number;
  fechaCreacion?:      Date;
  fechaActualizacion?: Date;
  __v?:                number;
}

interface ChartDataset {
  id?: number;
  label?: string;
  data?: number[];
  borderColor?: string;
  backgroundColor?: string;
}

export interface Data {
  id?: number;
  labels?: string[];
  datasets?: ChartDataset[];
}

