import { GastosSchema } from '@/schemas/gastos';
import { GastoType } from '@/types/gastos';

class GastosModels {
  async crearGasto(gasto: GastoType) {
    try {
      await GastosSchema.create(gasto);

      return 'Gasto creado';
    } catch {
      return 'Error al crear gasto';
    }
  }
  async ObtenerGastosFacturador(id: string, fecha: string) {
    try {
      console.log(id, fecha);
      
      const localDate = new Date(fecha);
      const inicioDelDia = new Date(localDate);
      inicioDelDia.setUTCHours(6, 0, 0, 0);

      const finDelDia = new Date(localDate);
      finDelDia.setUTCHours(29, 59, 59, 999);

      const gastos = await GastosSchema.find({
        facturador: id,
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
}

export default new GastosModels();
