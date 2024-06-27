const Order = require("../models/order");
const User = require("../models/userModel");

const addOrder = async (req, res) => {
  try {
    const { orderItems, paymentType, subtotal, userTable } = req.body;
    const user_id = req.user._id;
    console.log('User ID from cookie:', user_id);
    console.log(userTable);


    const order = new Order({ orderItems, paymentType, subtotal, user_id,userTable });
    const savedOrder = await order.save();

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getOrders = async (req, res) => {
  try {
    // Вземаме всички поръчки от базата данни
    const orders = await Order.find();

    // Групираме поръчките по клиент
    const ordersByClient = {};
    orders.forEach(order => {
      if (!ordersByClient[order.user_id]) {
        ordersByClient[order.user_id] = [order];
      } else {
        ordersByClient[order.user_id].push(order);
      }
    });

    res.status(200).json({ ordersByClient });
  } catch (err) {
    console.error('Грешка при извличане на поръчки:', err);
    res.status(500).json({ error: 'Възникна грешка при извличане на поръчките' });
  }
};

const getOrder = (req, res) => {
  Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        Address.findOne({
          user: req.user._id,
        }).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          order.address = address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
};

//Waiter
// Контролер за вземане и удобряване на новите поръчки от сервитьорите
const getNewOrders = async (req, res) => {
  try {
    const newOrders = await Order.find({ status: 'New' });
    res.json(newOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Approved' }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getReadyOrders = async (req, res) => {
  try {
    const newOrders = await Order.find({ status: 'Ready' });
    res.json(newOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const finnishOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Finnish' }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFinnishOrders = async (req, res) => {
  try {
    const newOrders = await Order.find({ status: 'Finnish' });
    res.json(newOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//Cook
const getApprovedOrders = async (req, res) => {
  try {
    const approvedOrders = await Order.find({ status: 'Approved' });
    res.json(approvedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const putReadyOrders = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Ready' }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlockOrders = async (req, res) => {
  try {
    const newOrders = await Order.find({ status: 'Rejected' });
    res.json(newOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const blockOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Rejected' }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
  
    const deleteOrder = await Order.findByIdAndDelete(orderId);

    if (!deleteOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(deleteOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addOrder,
   getOrders,
    getOrder,
    getNewOrders,
    approveOrder,
    getApprovedOrders,
    putReadyOrders,
    getReadyOrders,
    finnishOrder,
    getBlockOrders,
    blockOrder,
    deleteOrder,
    getFinnishOrders
}