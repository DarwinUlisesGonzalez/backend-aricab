// controllers/programacion.controller.ts
import { Request, Response } from 'express';
import programacionModel from '../models/programacion';
import { ClienteProgramado } from '../types/programacion';
import { randomUUID } from 'node:crypto';

class ProgramacionController {
  private validarClientes(clientes: unknown): string | null {
    if (!Array.isArray(clientes)) return 'clientes debe ser un arreglo';

    for (const c of clientes as ClienteProgramado[]) {
      if (typeof c.clienteId !== 'string' || !c.clienteId.trim()) {
        return 'cada cliente requiere clienteId';
      }
      if (typeof c.orden !== 'number' || !Number.isFinite(c.orden)) {
        return 'cada cliente requiere orden numérico';
      }
    }

    const ids = (clientes as ClienteProgramado[]).map((c) => c.clienteId);
    if (new Set(ids).size !== ids.length) return 'hay clientes repetidos en la lista';

    const ordenes = (clientes as ClienteProgramado[]).map((c) => c.orden);
    if (new Set(ordenes).size !== ordenes.length) return 'hay órdenes repetidos en la lista';

    return null;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const data = await programacionModel.findAll(req.query.activas === 'true');
      return res.json(data);
    } catch {
      return res.status(500).json({ message: 'Error al obtener las programaciones' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const prog = await programacionModel.findById(req.params.id);
      if (!prog) return res.status(404).json({ message: 'Programación no encontrada' });
      return res.status(200).json(prog);
    } catch {
      return res.status(500).json({ message: 'Error al obtener la programación' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { nombre, clientes = [] } = req.body as { nombre: string; clientes?: ClienteProgramado[] };

      if (typeof nombre !== 'string' || !nombre.trim()) {
        return res.status(400).json({ message: 'nombre es requerido' });
      }

      const error = this.validarClientes(clientes);
      if (error) return res.status(400).json({ message: error });

      const prog = await programacionModel.create({
        id: randomUUID(),
        nombre: nombre.trim(),
        clientes,
        activo: true,
      });

      return res.status(200).json(prog);
    } catch {
      return res.status(500).json({ message: 'Error al crear la programación' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { nombre, clientes, activo } = req.body as { nombre?: string; clientes?: ClienteProgramado[]; activo?: boolean };
      const data: Record<string, unknown> = {};

      if (nombre !== undefined) {
        if (typeof nombre !== 'string' || !nombre.trim()) {
          return res.status(400).json({ message: 'nombre inválido' });
        }
        data.nombre = nombre.trim();
      }

      if (clientes !== undefined) {
        const error = this.validarClientes(clientes);
        if (error) return res.status(400).json({ message: error });
        data.clientes = clientes;
      }

      if (activo !== undefined) {
        if (typeof activo !== 'boolean') {
          return res.status(400).json({ message: 'activo debe ser booleano' });
        }
        data.activo = activo;
      }

      const prog = await programacionModel.update(req.params.id, data);
      if (!prog) return res.status(404).json({ message: 'Programación no encontrada' });

      return res.status(200).json(prog);
    } catch {
      return res.status(500).json({ message: 'Error al actualizar la programación' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const prog = await programacionModel.delete(req.params.id);
      if (!prog) return res.status(404).json({ message: 'Programación no encontrada' });
      return res.status(200).json({ message: 'Programación desactivada', prog });
    } catch {
      return res.status(500).json({ message: 'Error al eliminar la programación' });
    }
  };
}

export default new ProgramacionController();