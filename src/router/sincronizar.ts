import { Router } from 'express';
import SincronizarControllers from '../controllers/sincronizar';

const router = Router();

router.post('/general', (req, res) => {
  void SincronizarControllers.sincronizarGeneral(req, res);
});

export default router;