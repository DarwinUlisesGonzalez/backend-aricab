import { Router } from 'express';
import AsignacionController from '../controllers/asignacion';

const router = Router();

router.get('/', (req, res) => {
  void AsignacionController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  void AsignacionController.getById(req, res);
});
router.post('/', (req, res) => {
  void AsignacionController.create(req, res);
});
router.put('/:id', (req, res) => {
  void AsignacionController.update(req, res);
});
router.delete('/:id', (req, res) => {
  void AsignacionController.delete(req, res);
});

router.get('/rutas/:rutaId', (req, res) => {
  void AsignacionController.getPorRuta(req, res);
});

export default router;