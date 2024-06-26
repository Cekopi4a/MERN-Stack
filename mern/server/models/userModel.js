const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  table: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['guest','admin','waiter'],
    required: true
  },
  isBlocked: {
    type: Boolean,
    default: false // По подразбиране, потребителят не е блокиран
  }
})

// static signup method
userSchema.statics.signup = async function(email, password,table,role) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash ,table,role})

  return user
}

// static login method
userSchema.statics.login = async function(email, password,table,role) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  if (user.isBlocked == true) {
    throw Error('User is blocked!')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)