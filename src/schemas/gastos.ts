import mongoose from 'mongoose';

const Gastos = new mongoose.Schema({
  id: { type: String, required: true },
  ruta: { type: String, required: true },
  tipo: { type: String, required: true },
  fecha: { type: Date, required: true },
  monto: { type: Number, required: true },
});

export const GastosSchema = mongoose.model('gastos', Gastos);
