const Cart = require('../models/cart.js')
const mongoose = require('mongoose')

// get all workouts
const getCarts = async (req, res) => {
  const user_id = req.user._id

  const cart = await Cart.find({user_id}).sort({createdAt: -1})

  res.status(200).json(cart)
}

// get a single workout
const getCart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const cart = await Cart.findById(id)

  if (!cart) {
    return res.status(404).json({error: 'No such workout'})
  }
  
  res.status(200).json(cart)
}


// create new workout
const createCart = async (req, res) => {
  const { id,
    name,
    description,
    weight,
    volume,
    price,
    imageUrl } = req.body

  let emptyFields = []

  if(!id) {
    emptyFields.push('id')
  }
  if(!name) {
    emptyFields.push('name')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(!weight) {
    emptyFields.push('weight')
  }
  if(!volume) {
    emptyFields.push('volume')
  }
  if(!price) {
    emptyFields.push('price')
  }
  if(!imageUrl) {
    emptyFields.push('imageUrl')
  }

 
  if(!emptyFields.length < 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const cart = await Cart.create({id,
      name,
      description,
      weight,
      volume,
      price,
      imageUrl, 
      user_id})
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteCart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const cart = await Cart.findOneAndDelete({_id: id})

  if (!cart) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(cart)
}

// update a workout
const updateCart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const cart = await Cart.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!cart) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(cart)
}


module.exports = {
  getCarts,
  getCart,
  createCart,
  deleteCart,
  updateCart
}