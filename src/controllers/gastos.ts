import { Request, Response } from 'express';
import GastosModels from '@/models/gastos';

class GastosControllers {
  async crearGasto(req: Request, res: Response) {
    try {
      const { id, ruta, tipo, fecha, monto } = req.body as {
        id: string;
        ruta: string;
        tipo: string;
        fecha: string;
        monto: number;
      };

      if (!id || !ruta || !tipo || !fecha || !monto) {
        return res.status(400).json({ message: 'Datos requeridos' });
      }

      const result = await GastosModels.crearGasto({
        id,
        ruta,
        tipo,
        fecha,
        monto,
      });

      if (result !== 'Gasto creado') {
        return res.status(500).json({ message: result });
      }

      return res.status(200).json({ message: result });
    } catch {
      res.status(500).json({ message: 'Error al crear gasto' });
    }
  }
  async ObtenerGastosFacturador(req: Request, res: Response) {
    try {
      const { id, fecha } = req.params as { id: string; fecha: string };

      if (!id || !fecha) {
        return res.status(400).json({ message: 'Datos requeridos' });
      }

      const gastos = await GastosModels.ObtenerGastosFacturador(id, fecha);

      if (gastos.length === 0) {
        return res.status(404).json({ message: 'Gastos no encontrados' });
      }

      return res.status(200).json(gastos);
    } catch {
      res.status(500).json({ message: 'Error al obtener gastos' });
    }
  }
  async eliminarGasto(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        return res.status(400).json({ message: 'Faltan datos' });
      }

      const response = await GastosModels.eliminarGasto(id);

      if (response === 'Error al eliminar gasto') {
        return res.status(400).json({ message: response });
      }

      if (response === 'Gasto no encontrado') {
        return res.status(404).json({ message: response });
      }

      res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al eliminar gasto' });
    }
  }
}

export default new GastosControllers();
