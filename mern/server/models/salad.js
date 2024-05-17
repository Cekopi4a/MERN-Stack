const mongoose = require('mongoose');

const SaladSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  weight: {
    type: String,
    required: false
  },
  volume: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
}, { timestamps: true });


module.exports = mongoose.model('Salad', SaladSchema);