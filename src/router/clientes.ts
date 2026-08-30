import { Router } from 'express';
import ClientesControllers from '../controllers/clientes';

const router = Router();

router.get('/', (req, res) => {
  void ClientesControllers.obtenerClientes(req, res);
});

router.get('/:id', (req, res) => {
  void ClientesControllers.obtenerCliente(req, res);
});

router.post('/', (req, res) => {
  void ClientesControllers.crearCliente(req, res);
});

router.put('/:id', (req, res) => {
  void ClientesControllers.actualizarCliente(req, res);
});

router.delete('/:id', (req, res) => {
  void ClientesControllers.eliminarCliente(req, res);
});

router.put('/:id/ubicacion', (req, res) => {
  void ClientesControllers.actualizarUbicacion(req, res);
});

router.delete('/:id/ubicacion', (req, res) => {
  void ClientesControllers.eliminarUbicacion(req, res);
});

export default router;