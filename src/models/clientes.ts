import { ClientesSchema } from '@/schemas/clientes';
import { ClienteType, MejorCompradorRow } from '@/types/clientes';
import FacturasModels from '@/models/facturas';
import { FacturasSchemas } from '@/schemas/facturas';

class ClientesModels {
  async obtenerClientes() {
    try {
      const clientes: ClienteType[] = await ClientesSchema.find();
      return clientes.sort((a, b) => a.nombres.localeCompare(b.nombres));
    } catch {
      return [];
    }
  }
  async obtenerCliente(id: string) {
    try {
      const cliente: ClienteType | null = await ClientesSchema.findOne({ id });

      if (cliente) {
        return cliente;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
  async crearCliente(
    id: string,
    nombres: string,
    direccion: string,
    telefono: string,
  ) {
    try {
      const cliente = await ClientesSchema.findOne({ nombres });

      if (cliente) {
        return 'Cliente ya existe';
      }

      await ClientesSchema.create({ id, nombres, direccion, telefono });

      return 'Cliente creado';
    } catch {
      return 'Error al crear cliente';
    }
  }
  async actualizarCliente(
    id: string,
    nombres: string,
    direccion: string,
    telefono: string,
  ) {
    try {
      const cliente = await ClientesSchema.findOne({ id });

      if (!cliente) {
        return 'Cliente no existe';
      }

      const clienteNombre = await ClientesSchema.findOne({ nombres });

      if (clienteNombre && clienteNombre.id !== id) {
        return 'Nombre de cliente ya existe';
      }

      await ClientesSchema.updateOne({ id }, { nombres, direccion, telefono });

      // Actualizar nombre en las facturas
      await FacturasModels.actualizarClienteFactura(cliente.nombres, nombres);

      return 'Cliente actualizado';
    } catch {
      return 'Error al actualizar cliente';
    }
  }
  async eliminarCliente(id: string) {
    try {
      const cliente = await ClientesSchema.findOne({ id });

      if (!cliente) {
        return 'Cliente no existe';
      }

      await ClientesSchema.deleteOne({ id });
      return 'Cliente eliminado';
    } catch {
      return 'Error al eliminar cliente';
    }
  }
  async actualizarUbicacion(
    id: string,
    lng: number,
    lat: number,
    precision?: number,
  ) {
    return ClientesSchema.findOneAndUpdate(
      { id },
      {
        ubicacion: { type: 'Point', coordinates: [lng, lat] },
        precision,
      },
      { new: true },
    );
  }
  async eliminarUbicacion(id: string) {
    return ClientesSchema.findOneAndUpdate(
      { id },
      { ubicacion: null, precision: null },
      { new: true },
    );
  }
  async mejoresCompradores(desde: Date, hasta: Date, limite = 10, excluidos: string[]) {
    return await FacturasSchemas.aggregate<MejorCompradorRow>([
      {
        $match: {
          fecha: { $gte: desde, $lt: hasta },
          nombre: { $nin: ['COMODIN', ...excluidos] },
        },
      },
      {
        $group: {
          _id: '$nombre',
          total: { $sum: '$total' },
          facturas: { $sum: 1 },
          unidades: { $sum: { $sum: '$productos.cantidad' } },
        },
      },
      { $sort: { total: -1 } },
      { $limit: limite },
      {
        $project: {
          _id: 0,
          nombre: '$_id',
          total: { $round: ['$total', 2] },
          facturas: 1,
          unidades: 1,
          ticketPromedio: { $round: [{ $divide: ['$total', '$facturas'] }, 2] },
        },
      },
    ]);
  }
}

export default new ClientesModels();
