// models/programacion.model.ts
import { ProgramacionSchema } from '../schemas/programacion';
import { ProgramacionType } from '../types/programacion';

class ProgramacionModel {
  async findAll(soloActivas = false) {
    const filtro = soloActivas ? { activo: true } : {};
    return ProgramacionSchema.find(filtro).sort({ nombre: 1 });
  }

  async findById(id: string) {
    return ProgramacionSchema.findOne({ id });
  }

  async findByCliente(clienteId: string) {
    return ProgramacionSchema.find({
      'clientes.clienteId': clienteId,
      activo: true,
    });
  }

  async create(data: ProgramacionType) {
    return ProgramacionSchema.create(data);
  }

  async update(id: string, data: Partial<ProgramacionType>) {
    return ProgramacionSchema.findOneAndUpdate({ id }, data, { new: true });
  }

  async delete(id: string) {
    return ProgramacionSchema.findOneAndUpdate(
      { id },
      { activo: false },
      { new: true },
    );
  }
}

export default new ProgramacionModel();
