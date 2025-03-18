// controllers/orderController.js
import Order from '../model/orderModel.js';
import UserModel from '../model/userModel.js';
import mongoose from 'mongoose';
export const placeOrder = async (req, res) => {
    try {
      const { items, totalPrice } = req.body;
      const user = req.user.id; // Ensure req.user exists
      const FoundUser=UserModel.findById(user)
      if (!FoundUser) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
  
      // Validate items array
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items must be a non-empty array' });
      }
  
      // Ensure each product has a valid MongoDB ObjectId
      for (const item of items) {
        if (!mongoose.Types.ObjectId.isValid(item.product)) {
          return res.status(400).json({ message: `Invalid product ID: ${item.product}` });
        }
      }
  
      const newOrder = new Order({ user, items, totalPrice });
      await newOrder.save();
  
      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
      console.error('Order Placement Error:', error); // Log full error
      res.status(500).json({ message: 'Error placing order', error: error.message });
    }
  };
  

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user items.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};