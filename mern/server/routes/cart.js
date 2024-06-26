const express = require('express')
const {
  createCart,
  getCarts,
  getCart,
  deleteCart,
  updateCart
} = require('../controllers/cartController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getCarts)

//GET a single workout
router.get('/:id', getCart)

// POST a new workout
router.post('/', createCart)

// DELETE a workout
router.delete('/:id', deleteCart)

// UPDATE a workout
router.patch('/:id', updateCart)


module.exports = router