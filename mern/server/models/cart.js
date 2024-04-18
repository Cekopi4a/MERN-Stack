const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
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
    user_id: {
        type: String,
        required: true
      }
}, { timestamps: true });


module.exports = mongoose.model('Cart', cartSchema);