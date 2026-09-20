import mongoose from 'mongoose';

const Liquidacion = new mongoose.Schema(
  {
    id: { type: String, required: true },
    fecha: { type: String, required: true },
    rutaId: { type: String, required: true },

    esperado: { type: Number, required: true },
    efectivo: { type: Number, required: true },
    diferencia: { type: Number, required: true },

    credito: { type: Number, required: true },
    total: { type: Number, required: true },

    observacion: { type: String, default: '' },
  },
  { timestamps: true },
);

Liquidacion.index({ fecha: 1, rutaId: 1 }, { unique: true });

export const LiquidacionSchema = mongoose.model('liquidaciones', Liquidacion);
