const mongoose = require("mongoose");
// A
const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    subtotal: {
      type: Number,
      required: false,
    },
    items: [
      {
        Product_id: {
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
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      default: "completed",
      required: false,
    },
    paymentType: {
      type: String,
      enum: ["Cash", "Card"],
      default: "Cash",
      required: false,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["Ordered", "Accepted", "Complete"],
          default: "Ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);