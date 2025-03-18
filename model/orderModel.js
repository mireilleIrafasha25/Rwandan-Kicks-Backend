// models/order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, default: 'pending' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
}); 
const OrderModel=mongoose.model('Order', OrderSchema);
export default OrderModel;