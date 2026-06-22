import io from '@/app';
import mongoose from 'mongoose';
import { DevolucionesSchemas } from '@/schemas/devoluciones';
import { RegistroSchemas } from '@/schemas/registro';
import { DevolucionesType, ProductosDevolucion } from '@/types/devoluciones';

class DevolucionesModels {
  async obtenerDevoluciones(fecha: string) {
    try {
      const localDate = new Date(fecha);

      const inicioDelDia = new Date(localDate);
      inicioDelDia.setUTCHours(6, 0, 0, 0);

      const finDelDia = new Date(localDate);
      finDelDia.setUTCHours(29, 59, 59, 999);

      const devoluciones = await DevolucionesSchemas.find({
        fecha: {
          $gte: inicioDelDia,
          $lte: finDelDia,
        },
      });

      return devoluciones;
    } catch {
      return [];
    }
  }
  async crearDevolucion(devolucion: DevolucionesType) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await DevolucionesSchemas.create([devolucion], { session });
        await RegistroSchemas.updateOne(
          { ruta: devolucion.facturador, terminada: false },
          { $inc: { devoluciones: devolucion.total } },
          { session },
        );
      });
      io.emit('devolucionAdd', devolucion);
      return 'Devolución creada';
    } catch (error) {
      console.error('Error al crear la devolución:', error);
      return 'Error al crear la devolución';
    } finally {
      await session.endSession();
    }
  }

  async actualizarDevolucion(id: string, productos: ProductosDevolucion[]) {
    const session = await mongoose.startSession();
    try {
      let resultado = 'Devolución actualizada';

      await session.withTransaction(async () => {
        const devolucion = await DevolucionesSchemas.findOne({ id }).session(
          session,
        );
        if (!devolucion) {
          resultado = 'Devolución no encontrada';
          return;
        }

        const total = productos.reduce(
          (acc, p) => acc + p.cantidad * p.precio,
          0,
        );
        const delta = total - devolucion.total; // devolucion.total = valor viejo

        await DevolucionesSchemas.updateOne(
          { id },
          { productos, total },
          { session },
        );

        await RegistroSchemas.updateOne(
          { ruta: devolucion.facturador, terminada: false },
          { $inc: { devoluciones: delta } },
          { session },
        );

        io.emit('devolucionUpdate', { id, productos, total });
      });

      return resultado;
    } catch (error) {
      console.error('Error al actualizar la devolución:', error);
      return 'Error al actualizar la devolución';
    } finally {
      await session.endSession();
    }
  }

  async eliminarDevolucion(id: string) {
    const session = await mongoose.startSession();
    try {
      let resultado = 'Devolución eliminada';

      await session.withTransaction(async () => {
        const devolucion = await DevolucionesSchemas.findOne({ id }).session(
          session,
        );
        if (!devolucion) {
          resultado = 'Devolución no encontrada';
          return;
        }

        await DevolucionesSchemas.deleteOne({ id }, { session });

        await RegistroSchemas.updateOne(
          { ruta: devolucion.facturador, terminada: false },
          { $inc: { devoluciones: -devolucion.total } },
          { session },
        );

        io.emit('devolucionDelete', id);
      });

      return resultado;
    } catch (error) {
      console.error('Error al eliminar la devolución:', error);
      return 'Error al eliminar la devolución';
    } finally {
      await session.endSession();
    }
  }
  async ObtenerDevolucionesFacturador(id: string, fecha: string) {
    try {
      const localDate = new Date(fecha);
      const inicioDelDia = new Date(localDate);
      inicioDelDia.setUTCHours(6, 0, 0, 0);

      const finDelDia = new Date(localDate);
      finDelDia.setUTCHours(29, 59, 59, 999);

      const devoluciones = await DevolucionesSchemas.find({
        facturador: id,
        fecha: {
          $gte: inicioDelDia,
          $lte: finDelDia,
        },
      });
      return devoluciones;
    } catch {
      return [];
    }
  }
}

export default new DevolucionesModels();
