import express from 'express';
import * as paymentCtrl from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', paymentCtrl.criar);
router.get('/:id', paymentCtrl.consultar);
router.put('/:id', paymentCtrl.cancelar);

export default router;
