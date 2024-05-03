const Order = require("../models/order");
const Cart = require("../models/cart");

const addOrder = async (req, res) => {
  try {
    const { orderItems, paymentType, subtotal, userTable } = req.body;
    const user_id = req.user._id;
    console.log('User ID from cookie:', user_id);
    console.log(userTable);
    

    const order = new Order({ orderItems, paymentType, subtotal, user_id,userTable });
    const savedOrder = await order.save();

    // Вместо да върнете целия обект, върнете само нужната информация (например, идентификатора на поръчката)
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
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

module.exports = {
  addOrder,
   getOrders,
    getOrder
}