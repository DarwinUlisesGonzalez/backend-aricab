// controllers/liquidacion.controller.ts
import { Request, Response } from 'express';
import liquidacionModel from '../models/liquidacion';
import { LiquidacionInput, LiquidacionUpdate } from '../types/liquidacion';

const FECHA_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const esFechaValida = (fecha: unknown): fecha is string =>
  typeof fecha === 'string' && FECHA_REGEX.test(fecha);

const hoy = (): string => {
  const ahora = new Date();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  return `${ahora.getFullYear().toString()}-${mes}-${dia}`;
};

const esNumero = (valor: unknown): valor is number =>
  typeof valor === 'number' && Number.isFinite(valor);

// El índice único { fecha, rutaId } dispara 11000 si dos guardados corren a la vez
const esDuplicado = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  (error as { code?: unknown }).code === 11000;

class LiquidacionController {
  async getAll(req: Request, res: Response) {
    try {
      const rutaId =
        typeof req.query.rutaId === 'string' ? req.query.rutaId : undefined;
      const desde =
        typeof req.query.desde === 'string' ? req.query.desde : undefined;
      const hasta =
        typeof req.query.hasta === 'string' ? req.query.hasta : undefined;

      if (desde !== undefined && !esFechaValida(desde)) {
        return res
          .status(400)
          .json({ message: 'desde debe tener el formato YYYY-MM-DD' });
      }
      if (hasta !== undefined && !esFechaValida(hasta)) {
        return res
          .status(400)
          .json({ message: 'hasta debe tener el formato YYYY-MM-DD' });
      }
      if (desde !== undefined && hasta !== undefined && desde > hasta) {
        return res
          .status(400)
          .json({ message: 'desde no puede ser posterior a hasta' });
      }

      return res
        .status(200)
        .json(await liquidacionModel.findAll({ rutaId, desde, hasta }));
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al obtener las liquidaciones' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const liquidacion = await liquidacionModel.findById(req.params.id);
      if (!liquidacion)
        return res.status(404).json({ message: 'Liquidación no encontrada' });
      return res.status(200).json(liquidacion);
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al obtener la liquidación' });
    }
  }

  async getPorFecha(req: Request, res: Response) {
    try {
      const { fecha } = req.params;

      if (!esFechaValida(fecha)) {
        return res
          .status(400)
          .json({ message: 'fecha debe tener el formato YYYY-MM-DD' });
      }

      return res.status(200).json(await liquidacionModel.findByFecha(fecha));
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al obtener las liquidaciones de la fecha' });
    }
  }

  async getPorRango(req: Request, res: Response) {
    try {
      const { desde, hasta } = req.params;
      const rutaId =
        typeof req.query.rutaId === 'string' ? req.query.rutaId : undefined;

      if (!esFechaValida(desde)) {
        return res
          .status(400)
          .json({ message: 'desde debe tener el formato YYYY-MM-DD' });
      }
      if (!esFechaValida(hasta)) {
        return res
          .status(400)
          .json({ message: 'hasta debe tener el formato YYYY-MM-DD' });
      }
      if (desde > hasta) {
        return res
          .status(400)
          .json({ message: 'desde no puede ser posterior a hasta' });
      }

      return res
        .status(200)
        .json(await liquidacionModel.findAll({ rutaId, desde, hasta }));
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al obtener las liquidaciones del rango' });
    }
  }

  async getPorRuta(req: Request, res: Response) {
    try {
      const { rutaId } = req.params;

      if (typeof rutaId !== 'string' || !rutaId.trim()) {
        return res.status(400).json({ message: 'rutaId es requerido' });
      }

      return res.status(200).json(await liquidacionModel.findByRuta(rutaId));
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al obtener las liquidaciones de la ruta' });
    }
  }

  async guardar(req: Request, res: Response) {
    try {
      const { fecha, rutaId, esperado, efectivo, credito, observacion } =
        req.body as LiquidacionInput;

      if (!esFechaValida(fecha)) {
        return res
          .status(400)
          .json({ message: 'fecha debe tener el formato YYYY-MM-DD' });
      }
      if (fecha > hoy()) {
        return res
          .status(400)
          .json({ message: 'La fecha no puede ser futura' });
      }
      if (typeof rutaId !== 'string' || !rutaId.trim()) {
        return res.status(400).json({ message: 'rutaId es requerido' });
      }
      if (!esNumero(esperado)) {
        return res
          .status(400)
          .json({ message: 'esperado debe ser un número válido' });
      }
      if (!esNumero(efectivo)) {
        return res
          .status(400)
          .json({ message: 'efectivo debe ser un número válido' });
      }
      if (!esNumero(credito)) {
        return res
          .status(400)
          .json({ message: 'credito debe ser un número válido' });
      }
      if (observacion !== undefined && typeof observacion !== 'string') {
        return res.status(400).json({ message: 'observacion debe ser texto' });
      }

      const creada = !(await liquidacionModel.existe(fecha, rutaId));

      const liquidacion = await liquidacionModel.guardar(fecha, rutaId, {
        fecha,
        rutaId,
        esperado,
        efectivo,
        diferencia: efectivo - esperado,
        credito,
        total: efectivo + credito,
        observacion: observacion?.trim() ?? '',
      });

      return res
        .status(200)
        .json({ message: 'Liquidación guardada', creada, liquidacion });
    } catch (error) {
      if (esDuplicado(error)) {
        return res
          .status(409)
          .json({ message: 'Ya existe una liquidación para esa ruta y fecha' });
      }
      return res
        .status(500)
        .json({ message: 'Error al guardar la liquidación' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const actual = await liquidacionModel.findById(req.params.id);
      if (!actual)
        return res.status(404).json({ message: 'Liquidación no encontrada' });

      const { fecha, rutaId, esperado, efectivo, credito, observacion } =
        req.body as Partial<LiquidacionInput>;
      const data: LiquidacionUpdate = {};

      if (fecha !== undefined) {
        if (!esFechaValida(fecha)) {
          return res
            .status(400)
            .json({ message: 'fecha debe tener el formato YYYY-MM-DD' });
        }
        if (fecha > hoy()) {
          return res
            .status(400)
            .json({ message: 'La fecha no puede ser futura' });
        }
        data.fecha = fecha;
      }

      if (rutaId !== undefined) {
        if (typeof rutaId !== 'string' || !rutaId.trim()) {
          return res.status(400).json({ message: 'rutaId inválido' });
        }
        data.rutaId = rutaId;
      }

      if (esperado !== undefined) {
        if (!esNumero(esperado)) {
          return res
            .status(400)
            .json({ message: 'esperado debe ser un número válido' });
        }
        data.esperado = esperado;
      }

      if (efectivo !== undefined) {
        if (!esNumero(efectivo)) {
          return res
            .status(400)
            .json({ message: 'efectivo debe ser un número válido' });
        }
        data.efectivo = efectivo;
      }

      if (credito !== undefined) {
        if (!esNumero(credito)) {
          return res
            .status(400)
            .json({ message: 'credito debe ser un número válido' });
        }
        data.credito = credito;
      }

      if (observacion !== undefined) {
        if (typeof observacion !== 'string') {
          return res
            .status(400)
            .json({ message: 'observacion debe ser texto' });
        }
        data.observacion = observacion.trim();
      }

      // diferencia y total siempre se recalculan con los valores finales
      const esperadoFinal = data.esperado ?? actual.esperado;
      const efectivoFinal = data.efectivo ?? actual.efectivo;
      const creditoFinal = data.credito ?? actual.credito;

      data.diferencia = efectivoFinal - esperadoFinal;
      data.total = efectivoFinal + creditoFinal;

      return res
        .status(200)
        .json(await liquidacionModel.update(req.params.id, data));
    } catch (error) {
      if (esDuplicado(error)) {
        return res
          .status(409)
          .json({ message: 'Ya existe una liquidación para esa ruta y fecha' });
      }
      return res
        .status(500)
        .json({ message: 'Error al actualizar la liquidación' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const liquidacion = await liquidacionModel.delete(req.params.id);
      if (!liquidacion)
        return res.status(404).json({ message: 'Liquidación no encontrada' });
      return res
        .status(200)
        .json({ message: 'Liquidación eliminada', liquidacion });
    } catch {
      return res
        .status(500)
        .json({ message: 'Error al eliminar la liquidación' });
    }
  }
}

export default new LiquidacionController();
