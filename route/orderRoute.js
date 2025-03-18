// routes/orderRoutes.js
import express from 'express';
import { placeOrder, getOrder, getAllOrders, updateOrderStatus } from '../controller/orderController.js';
import {authenticateToken,authorize} from "../middleware/authethicateToken.js"
const router = express.Router();

router.post('/newOrder',authenticateToken,authorize("buyer"), placeOrder); // Place a new order
router.get('/getOrderById/:id', getOrder); // Get a specific order by ID
router.get('/getAllOrder', getAllOrders); // Get all orders
router.put('/UpdateOrder/:id/status', updateOrderStatus); // Update order status

export default router;