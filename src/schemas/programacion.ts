import mongoose from 'mongoose';

const ClienteProgramado = new mongoose.Schema(
  {
    clienteId: { type: String, required: true },
    orden: { type: Number, required: true },
  },
  { _id: false }
);

const Programacion = new mongoose.Schema(
  {
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    clientes: { type: [ClienteProgramado], default: [] },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

Programacion.index({ 'clientes.clienteId': 1 });

export const ProgramacionSchema = mongoose.model('programacion', Programacion);