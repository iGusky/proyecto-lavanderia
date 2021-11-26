export default interface Catalogo {
  _id:     string;
  nombre:  string;
  precio:  number;
  tipo:    string;
  insumos: Insumo[];
  __v:     number;
}

export interface Insumo {
  insumo_id: string;
  consumo:   number;
  _id:       string;
}