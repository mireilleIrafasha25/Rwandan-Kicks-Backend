import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/cartController.js';
const router = express.Router();

router.post('/addcart', addToCart);
router.get('/getAllcart', getCart);
router.delete('/cart/:id', removeFromCart);

export default router;
