import { Router } from 'express';
import ProgramacionController from '../controllers/programacion';

const router = Router();

router.get('/', (req, res) => {
  void ProgramacionController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  void ProgramacionController.getById(req, res);
});
router.post('/', (req, res) => {
  void ProgramacionController.create(req, res);
});
router.put('/:id', (req, res) => {
  void ProgramacionController.update(req, res);
});
router.delete('/:id', (req, res) => {
  void ProgramacionController.delete(req, res);
});

export default router;