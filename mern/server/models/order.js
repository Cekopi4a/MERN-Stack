const mongoose = require('mongoose');

// Дефиниране на схемата за елементите на поръчката
const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  weight: { type: String, default: '' },
  volume: { type: String, default: '' },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true }
});

// Дефиниране на основната схема за поръчката с масив от елементи
const orderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  userTable: { type: String, required: true },
  paymentType: { type: String },
  subtotal: { type: Number },
  user_id: { type: String, required: true },
  status: {
    type: String,
    enum: ['New', 'Approved', 'Ready', 'Sent', 'Rejected'],
    default: 'New'
  },
  createdAt: { type: Date, default: Date.now }
});

// Създаване на модела за поръчката
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
