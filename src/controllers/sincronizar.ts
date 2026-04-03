import { RutasProductosSchemas } from '@/schemas/rutasProductos';
import { CambiosType } from '@/types/cambios';
import { DevolucionesType } from '@/types/devoluciones';
import { FacturaType } from '@/types/facturas';
import { GastoType } from '@/types/gastos';
import { RutasProductosType } from '@/types/rutasProductos';
import { Request, Response } from 'express';

import { FacturasSchemas } from '@/schemas/facturas';
import { CambiosSchemas } from '@/schemas/cambios';
import { DevolucionesSchemas } from '@/schemas/devoluciones';
import { GastosSchema } from '@/schemas/gastos';
import { RegistroSchemas } from '@/schemas/registro';
import mongoose from 'mongoose';

class SincronizarControllers {
  async sincronizarGeneral(req: Request, res: Response) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const { facturas, cambios, devoluciones, gastos, facturador } =
        req.body as {
          facturas: FacturaType[];
          cambios: CambiosType[];
          devoluciones: DevolucionesType[];
          gastos: GastoType[];
          facturador: string;
        };

      if (
        !Array.isArray(facturas) ||
        !Array.isArray(cambios) ||
        !Array.isArray(devoluciones) ||
        !Array.isArray(gastos) ||
        !facturador
      ) {
        await session.abortTransaction();
        return res.status(400).json({ message: 'Faltan datos' });
      }

      const ruta: RutasProductosType | null =
        await RutasProductosSchemas.findOne({ ruta: facturador }, null, { session });

      if (!ruta) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }

      const stock = new Map<string, number>();
      const consumo = new Map<string, number>();

      const cambiosAcumulados: Record<string, number> = {};

      // Calculamos el stock
      for (const prod of ruta.productos) {
        stock.set(prod.id, prod.cantidad);
      }

      if (facturas.length > 0) {
        // Calculamos el consumo de los productos de las factura
        for (const factura of facturas) {
          for (const prod of factura.productos) {
            consumo.set(prod.id, (consumo.get(prod.id) ?? 0) + prod.cantidad);
          }
        }
      }

      if (cambios.length > 0) {
        // Sumar cambios
        for (const cambio of cambios) {
          for (const prod of cambio.productos) {
            // consumo
            consumo.set(prod.id, (consumo.get(prod.id) ?? 0) + prod.cantidad);

            // cambios acumulados
            cambiosAcumulados[prod.nombre] =
              (cambiosAcumulados[prod.nombre] || 0) + prod.cantidad;
          }
        }
      }

      // validar stock
      let error = false;
      let producto = '';

      for (const [id, cantidadConsumida] of consumo.entries()) {
        const disponible = stock.get(id) ?? 0;

        if (cantidadConsumida > disponible) {
          error = true;
          producto = id;
          break;
        }
      }

      if (error) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ message: 'Stock insuficiente', producto });
      }

      if (gastos.length) {
        await GastosSchema.insertMany(gastos, { session });
      }

      if (devoluciones.length) {
        await DevolucionesSchemas.insertMany(devoluciones, { session });
      }

      if (cambios.length) {
        await CambiosSchemas.insertMany(cambios, { session });
      }

      if (facturas.length) {
        await FacturasSchemas.insertMany(facturas, { session });
      }

      // aplicar consumo al stock
      for (const prod of ruta.productos) {
        const consumido = consumo.get(prod.id) ?? 0;

        if (consumido > 0) {
          prod.cantidad -= consumido;
        }
      }

      // guardar cambios
      await RutasProductosSchemas.updateOne(
        { ruta: facturador },
        { productos: ruta.productos },
        { session },
      );

      const totalDescuentos = facturas.reduce(
        (acc, f) => acc + (f.descuento || 0),
        0,
      );
      const totalGastos = gastos.reduce((acc, g) => acc + (g.monto || 0), 0);
      const totalDevoluciones = devoluciones.reduce(
        (acc, d) => acc + (d.total || 0),
        0,
      );

      const incCambios: Record<string, number> = {};

      for (const key in cambiosAcumulados) {
        incCambios[`cambios.${key}`] = cambiosAcumulados[key];
      }

      await RegistroSchemas.updateOne(
        {
          ruta: facturador,
          terminada: false,
        },
        {
          $inc: {
            ...incCambios,
            descuentos: totalDescuentos,
            gastos: totalGastos,
            devoluciones: totalDevoluciones,
          },
        },
        { session, upsert: true },
      );

      await session.commitTransaction();
      res.status(200).json({ message: 'Sincronizado' });
    } catch(error) {
      console.log(error);
      await session.abortTransaction();
      res.status(500).json({ message: 'Error al sincronizar' });
    } finally {
      await session.endSession();
    }
  }
}

export default new SincronizarControllers();
