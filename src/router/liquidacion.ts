import { Router } from 'express';
import LiquidacionController from '../controllers/liquidacion';

const router = Router();

router.get('/', (req, res) => {
  void LiquidacionController.getAll(req, res);
});

router.get('/fecha/:fecha', (req, res) => {
  void LiquidacionController.getPorFecha(req, res);
});

router.get('/rango/:desde/:hasta', (req, res) => {
  void LiquidacionController.getPorRango(req, res);
});

router.get('/rutas/:rutaId', (req, res) => {
  void LiquidacionController.getPorRuta(req, res);
});

router.get('/:id', (req, res) => {
  void LiquidacionController.getById(req, res);
});

router.post('/', (req, res) => {
  void LiquidacionController.guardar(req, res);
});

router.put('/:id', (req, res) => {
  void LiquidacionController.update(req, res);
});

router.delete('/:id', (req, res) => {
  void LiquidacionController.delete(req, res);
});

export default router;
