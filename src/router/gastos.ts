import { Router } from 'express';
import GastosControllers from '@/controllers/gastos';

const router = Router();

router.post('/', (req, res) => {
  void GastosControllers.crearGasto(req, res);
});

router.get('/facturador/:id/fecha/:fecha', (req, res) => {
  void GastosControllers.ObtenerGastosFacturador(req, res);
});

router.delete('/:id', (req, res) => {
  void GastosControllers.eliminarGasto(req, res);
});

export default router;