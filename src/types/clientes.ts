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