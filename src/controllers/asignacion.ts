// controllers/asignacion.controller.ts
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import asignacionModel from '../models/asignacion';
import programacionModel from '../models/programacion';
import { Dia, Periodicidad, SemanaRef } from '../types/asignacion';
import { AsignacionesPorRutaResponse, AsignacionResuelta } from '@/types/agenda';

const DIAS: Dia[] = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const PERIODICIDADES: Periodicidad[] = ['semanal', 'quincenal'];

class AsignacionController {
  async getAll(req: Request, res: Response) {
    try {
      const rutaId =
        typeof req.query.rutaId === 'string' ? req.query.rutaId : undefined;
      return res.status(200).json(await asignacionModel.findAll(rutaId));
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al obtener las asignaciones' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const asig = await asignacionModel.findById(req.params.id);
      if (!asig)
        return res.status(404).json({ message: 'Asignación no encontrada' });
      return res.status(200).json(asig);
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al obtener la asignación' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        programacionId,
        rutaId,
        dia,
        secuencia,
        periodicidad = 'semanal',
        semanaRef,
      } = req.body as {
        programacionId: string;
        rutaId: string;
        dia: Dia;
        secuencia: number;
        periodicidad?: Periodicidad;
        semanaRef?: SemanaRef;
      };

      if (typeof programacionId !== 'string' || !programacionId.trim()) {
        return res.status(400).json({ message: 'programacionId es requerido' });
      }
      if (typeof rutaId !== 'string' || !rutaId.trim()) {
        return res.status(400).json({ message: 'rutaId es requerido' });
      }
      if (!DIAS.includes(dia)) {
        return res
          .status(400)
          .json({ message: `dia debe ser uno de: ${DIAS.join(', ')}` });
      }
      if (!Number.isInteger(secuencia) || secuencia < 1) {
        return res
          .status(400)
          .json({ message: 'secuencia debe ser un entero mayor a 0' });
      }
      if (!PERIODICIDADES.includes(periodicidad)) {
        return res
          .status(400)
          .json({ message: 'periodicidad debe ser semanal o quincenal' });
      }

      let ref: SemanaRef = null;
      if (periodicidad === 'quincenal') {
        if (semanaRef !== 'par' && semanaRef !== 'impar') {
          return res.status(400).json({
            message: 'semanaRef debe ser par o impar cuando es quincenal',
          });
        }
        ref = semanaRef;
      }

      const prog = await programacionModel.findById(programacionId);
      if (!prog)
        return res.status(404).json({ message: 'La programación no existe' });

      if (await asignacionModel.existeSecuencia(rutaId, dia, secuencia)) {
        return res.status(409).json({
          message: 'Esa ruta ya tiene una asignación con esa secuencia ese día',
        });
      }

      const asig = await asignacionModel.create({
        id: randomUUID(),
        programacionId,
        rutaId,
        dia,
        secuencia,
        periodicidad,
        semanaRef: ref,
        activo: true,
      });

      return res.status(200).json(asig);
    } catch {
      return res.status(500).json({ message: 'Error al crear la asignación' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const actual = await asignacionModel.findById(req.params.id);
      if (!actual)
        return res.status(404).json({ message: 'Asignación no encontrada' });

      const {
        programacionId,
        rutaId,
        dia,
        secuencia,
        periodicidad,
        semanaRef,
        activo,
      } = req.body as {
        programacionId?: string;
        rutaId?: string;
        dia?: Dia;
        secuencia?: number;
        periodicidad?: Periodicidad;
        semanaRef?: SemanaRef;
        activo?: boolean;
      };
      const data: Record<string, unknown> = {};

      if (programacionId !== undefined) {
        const prog = await programacionModel.findById(programacionId);
        if (!prog)
          return res.status(404).json({ message: 'La programación no existe' });
        data.programacionId = programacionId;
      }

      if (rutaId !== undefined) {
        if (typeof rutaId !== 'string' || !rutaId.trim()) {
          return res.status(400).json({ message: 'rutaId inválido' });
        }
        data.rutaId = rutaId;
      }

      if (dia !== undefined) {
        if (!DIAS.includes(dia)) {
          return res
            .status(400)
            .json({ message: `dia debe ser uno de: ${DIAS.join(', ')}` });
        }
        data.dia = dia;
      }

      if (secuencia !== undefined) {
        if (!Number.isInteger(secuencia) || secuencia < 1) {
          return res
            .status(400)
            .json({ message: 'secuencia debe ser un entero mayor a 0' });
        }
        data.secuencia = secuencia;
      }

      // periodicidad y semanaRef se resuelven juntas
      const nuevaPeriodicidad: Periodicidad =
        periodicidad ?? actual.periodicidad;
      if (
        periodicidad !== undefined &&
        !PERIODICIDADES.includes(periodicidad)
      ) {
        return res
          .status(400)
          .json({ message: 'periodicidad debe ser semanal o quincenal' });
      }

      if (nuevaPeriodicidad === 'quincenal') {
        const ref = semanaRef ?? actual.semanaRef;
        if (ref !== 'par' && ref !== 'impar') {
          return res.status(400).json({
            message: 'semanaRef debe ser par o impar cuando es quincenal',
          });
        }
        data.semanaRef = ref;
      } else {
        data.semanaRef = null;
      }
      data.periodicidad = nuevaPeriodicidad;

      if (activo !== undefined) {
        if (typeof activo !== 'boolean') {
          return res.status(400).json({ message: 'activo debe ser booleano' });
        }
        data.activo = activo;
      }

      const rutaFinal = (data.rutaId as string | undefined) ?? actual.rutaId;
      const diaFinal = (data.dia as Dia | undefined) ?? actual.dia;
      const secFinal =
        (data.secuencia as number | undefined) ?? actual.secuencia;
      const activoFinal = (data.activo as boolean | undefined) ?? actual.activo;

      if (
        activoFinal &&
        (await asignacionModel.existeSecuencia(
          rutaFinal,
          diaFinal,
          secFinal,
          req.params.id,
        ))
      ) {
        return res.status(409).json({
          message: 'Esa ruta ya tiene una asignación con esa secuencia ese día',
        });
      }

      return res
        .status(200)
        .json(await asignacionModel.update(req.params.id, data));
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al actualizar la asignación' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const asig = await asignacionModel.delete(req.params.id);
      if (!asig)
        return res.status(404).json({ message: 'Asignación no encontrada' });
      return res.status(200).json({ message: 'Asignación desactivada', asig });
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al eliminar la asignación' });
    }
  }

  async getPorRuta(
    req: Request<{ rutaId: string }>,
    res: Response<AsignacionesPorRutaResponse | { message: string }>,
  ) {
    try {
      const { rutaId } = req.params;

      if (typeof rutaId !== 'string' || !rutaId.trim()) {
        return res.status(400).json({ message: 'rutaId es requerido' });
      }

      const asignaciones = await asignacionModel.findAll(rutaId);
      const resultado: AsignacionResuelta[] = [];

      for (const asig of asignaciones) {
        const prog = await programacionModel.findById(asig.programacionId);
        if (!prog || !prog.activo) continue;

        resultado.push({
          id: asig.id,
          dia: asig.dia,
          secuencia: asig.secuencia,
          periodicidad: asig.periodicidad,
          semanaRef: asig.semanaRef,
          programacion: {
            id: prog.id,
            nombre: prog.nombre,
            clientes: [...prog.clientes].sort((a, b) => a.orden - b.orden),
          },
        });
      }

      return res.status(200).json({ rutaId, asignaciones: resultado });
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al obtener las asignaciones de la ruta' });
    }
  }
}

export default new AsignacionController();
