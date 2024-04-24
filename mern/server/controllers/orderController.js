const Order = require("../models/order");
const Cart = require("../models/cart");


const addOrder = async (req, res) => {
  // Order.create({ user: req.user._id }).exec((error, result) => {
  //   if (error) return res.status(400).json({ error });
  //   if (result) {
  //     req.body.user = req.user._id;
  //     req.body.orderStatus = [
  //       {
  //         type: "ordered",
  //         date: new Date(),
  //         isCompleted: true,
  //       },
  //       {
  //         type: "packed",
  //         isCompleted: false,
  //       },
  //       {
  //         type: "shipped",
  //         isCompleted: false,
  //       },
  //       {
  //         type: "delivered",
  //         isCompleted: false,
  //       },
  //     ];
  //     const order = new Order(req.body);
  //     order.save((error, order) => {
  //       if (error) return res.status(400).json({ error });
  //       if (order) {
  //         res.status(201).json({ order });
  //       }
  //     });
  //   }
  // });

    const {orderItems} = req.body
  
  
    // add doc to db
    try {
      const user_id = req.user._id
      const Orders = await Order.create({orderItems,user_id})
      res.status(200).json(Orders)
    } catch (error) {
      res.status(400).json({error: error.message})
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