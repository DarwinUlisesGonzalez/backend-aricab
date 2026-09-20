// models/liquidacion.model.ts
import { randomUUID } from 'crypto';
import { LiquidacionSchema } from '../schemas/liquidacion';
import {
  LiquidacionFiltros,
  LiquidacionType,
  LiquidacionUpdate,
} from '../types/liquidacion';

class LiquidacionModel {
  async findAll(filtros: LiquidacionFiltros = {}) {
    const filtro: Record<string, unknown> = {};

    if (filtros.rutaId) filtro.rutaId = filtros.rutaId;

    if (filtros.desde || filtros.hasta) {
      const rango: Record<string, string> = {};
      if (filtros.desde) rango.$gte = filtros.desde;
      if (filtros.hasta) rango.$lte = filtros.hasta;
      filtro.fecha = rango;
    }

    return LiquidacionSchema.find(filtro).sort({ fecha: -1 });
  }

  async findById(id: string) {
    return LiquidacionSchema.findOne({ id });
  }

  async findByFecha(fecha: string) {
    return LiquidacionSchema.find({ fecha }).sort({ rutaId: 1 });
  }

  async findByRuta(rutaId: string) {
    return LiquidacionSchema.find({ rutaId }).sort({ fecha: -1 });
  }

  async existe(fecha: string, rutaId: string) {
    return LiquidacionSchema.exists({ fecha, rutaId });
  }

  async guardar(
    fecha: string,
    rutaId: string,
    data: Omit<LiquidacionType, 'id'>,
  ) {
    return LiquidacionSchema.findOneAndUpdate(
      { fecha, rutaId },
      { $set: data, $setOnInsert: { id: randomUUID() } },
      { new: true, upsert: true },
    );
  }

  async update(id: string, data: LiquidacionUpdate) {
    return LiquidacionSchema.findOneAndUpdate({ id }, data, { new: true });
  }

  async delete(id: string) {
    return LiquidacionSchema.findOneAndDelete({ id });
  }
}

export default new LiquidacionModel();
