import mongoose from 'mongoose';

const Asignacion = new mongoose.Schema(
  {
    id: { type: String, required: true },
    programacionId: { type: String, required: true },
    rutaId: { type: String, required: true },

    dia: {
      type: String,
      required: true,
      enum: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    },
    secuencia: { type: Number, required: true },

    periodicidad: {
      type: String,
      required: true,
      enum: ['semanal', 'quincenal'],
      default: 'semanal',
    },
    semanaRef: {
      type: String,
      enum: ['par', 'impar', null],
      default: null,
    },

    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

Asignacion.index(
  { rutaId: 1, dia: 1, secuencia: 1 },
  { unique: true, partialFilterExpression: { activo: true } }
);

export const AsignacionSchema = mongoose.model('asignacion', Asignacion);