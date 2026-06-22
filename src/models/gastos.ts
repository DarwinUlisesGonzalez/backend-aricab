import io from '@/app';
import mongoose from 'mongoose';
import { GastosSchema } from '@/schemas/gastos';
import { RegistroSchemas } from '@/schemas/registro';
import { GastoType } from '@/types/gastos';

class GastosModels {
  async obtenerGastos(fecha: string) {
    try {
      const localDate = new Date(fecha);

      const inicioDelDia = new Date(localDate);
      inicioDelDia.setUTCHours(6, 0, 0, 0);

      const finDelDia = new Date(localDate);
      finDelDia.setUTCHours(29, 59, 59, 999);

      const gastos = await GastosSchema.find({
        fecha: {
          $gte: inicioDelDia,
          $lte: finDelDia,
        },
      });

      return gastos;
    } catch {
      return [];
    }
  }
  async crearGasto(gasto: GastoType) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await GastosSchema.create([gasto], { session }); // nota: array con session
        await RegistroSchemas.updateOne(
          { ruta: gasto.ruta, terminada: false },
          { $inc: { gastos: gasto.monto } },
          { session },
        );
      });
      io.emit('gastosAdd', gasto);
      return 'Gasto creado';
    } catch (error) {
      console.error('Error al crear gasto:', error);
      return 'Error al crear gasto';
    } finally {
      await session.endSession();
    }
  }
  async ObtenerGastosFacturador(id: string, fecha: string) {
    try {
      const localDate = new Date(fecha);

      const inicioDelDia = new Date(localDate);
      inicioDelDia.setUTCHours(6, 0, 0, 0);

      const finDelDia = new Date(localDate);
      finDelDia.setUTCHours(29, 59, 59, 999);

      const gastos = await GastosSchema.find({
        ruta: id,
        fecha: {
          $gte: inicioDelDia,
          $lte: finDelDia,
        },
      });

      return gastos;
    } catch {
      return [];
    }
  }
  async eliminarGasto(id: string) {
    try {
      const gasto = await GastosSchema.findOne({ id });
      if (!gasto) return 'Gasto no encontrado';

      await GastosSchema.deleteOne({ id });

      await RegistroSchemas.updateOne(
        { ruta: gasto.ruta, terminada: false },
        { $inc: { gastos: -gasto.monto } },
      );

      io.emit('gastosDelete', id);
      return 'Gasto eliminado';
    } catch (error) {
      console.error('Error al eliminar gasto:', error);
      return 'Error al eliminar gasto';
    }
  }
}

export default new GastosModels();
