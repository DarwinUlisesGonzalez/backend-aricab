// models/asignacion.model.ts
import { AsignacionSchema } from '../schemas/asignacion';
import { AsignacionType, Dia, AsignacionUpdate } from '../types/asignacion';

class AsignacionModel {
  async findAll(rutaId?: string) {
    const filtro = rutaId ? { rutaId, activo: true } : { activo: true };
    return AsignacionSchema.find(filtro).sort({
      rutaId: 1,
      dia: 1,
      secuencia: 1,
    });
  }

  async findById(id: string) {
    return AsignacionSchema.findOne({ id });
  }

  async findByRutaYDia(rutaId: string, dia: Dia) {
    return AsignacionSchema.find({ rutaId, dia, activo: true }).sort({
      secuencia: 1,
    });
  }

  async findByProgramacion(programacionId: string) {
    return AsignacionSchema.find({ programacionId, activo: true });
  }

  async existeSecuencia(
    rutaId: string,
    dia: Dia,
    secuencia: number,
    excluirId?: string,
  ) {
    const filtro: Record<string, unknown> = {
      rutaId,
      dia,
      secuencia,
      activo: true,
    };
    if (excluirId) filtro.id = { $ne: excluirId };
    return AsignacionSchema.exists(filtro);
  }

  async create(data: AsignacionType) {
    return AsignacionSchema.create(data);
  }

  async update(id: string, data: AsignacionUpdate) {
    return AsignacionSchema.findOneAndUpdate({ id }, data, { new: true });
  }

  async delete(id: string) {
    return AsignacionSchema.findOneAndUpdate(
      { id },
      { activo: false },
      { new: true },
    );
  }
  
}

export default new AsignacionModel();
