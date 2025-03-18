import express from 'express';
import { fakePayment } from '../controller/paymentController.js';

const router = express.Router();

router.post('/payment',fakePayment);

export default router;
