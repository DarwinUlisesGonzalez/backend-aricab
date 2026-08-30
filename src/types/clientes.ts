export interface ClienteType {
  _id?: string;
  __v?: number;
  id: string;
  nombres: string;
  direccion: string;
  telefono: string;
  ubicacion?: {
    type: 'Point';
    coordinates: [number, number];
  };
  precision?: number;
}

export interface MejorCompradorRow {
  nombre: string;
  total: number;
  facturas: number;
  unidades: number;
  ticketPromedio: number;
}

export interface MejoresCompradoresResponse {
  mes: string;
  enCurso: boolean;
  desde: string;
  hasta: string;
  excluidos: string[];
  clientes: MejorCompradorRow[];
}