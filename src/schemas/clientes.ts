import mongoose from 'mongoose';

const Ubicacion = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  { _id: false }
);

const Clientes = new mongoose.Schema({
  id: { type: String, required: true },
  nombres: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },

  ubicacion: { type: Ubicacion, default: null },
  precision: { type: Number, default: null },
});

export const ClientesSchema = mongoose.model('clientes', Clientes);