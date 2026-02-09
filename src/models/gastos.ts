import io from '@/app';
import { GastosSchema } from '@/schemas/gastos';
import { RegistroSchemas } from '@/schemas/registro';
import { GastoType } from '@/types/gastos';
import { RegistroType } from '@/types/registro';

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
    try {
      await GastosSchema.create(gasto);

      const registro: RegistroType | null = await RegistroSchemas.findOne({
        ruta: gasto.ruta,
        terminada: false,
      });

      if (registro) {
        await RegistroSchemas.updateOne(
          { id: registro.id },
          { gastos: registro.gastos + gasto.monto },
        );
      }

      io.emit('gastosAdd', gasto);

      return 'Gasto creado';
    } catch {
      return 'Error al crear gasto';
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

      if (!gasto) {
        return 'Gasto no encontrado';
      }

      await GastosSchema.deleteOne({ id });

      const registro: RegistroType | null = await RegistroSchemas.findOne({
        ruta: gasto.ruta,
        terminada: false,
      });

      if (registro) {
        await RegistroSchemas.updateOne(
          { id: registro.id },
          {
            gastos: registro.gastos - gasto.monto,
          },
        );
      }

      io.emit('gastosDelete', id);

      return 'Gasto eliminado';
    } catch {
      return 'Error al eliminar gasto';
    }
  }
}

export default new GastosModels();
