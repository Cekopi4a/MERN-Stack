const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js');

const secretKey = 'MySecretKey123'; // Ключ за криптиране

// Функция за декриптиране на данни
function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}


const createToken = (_id,role) => {
  let expiresIn = '20m'; // По подразбиране за клиенти
  if (role === 'admin' || role =="waiter") {
    expiresIn = '10h'; // За сервитьори - по-дълго време на живот
  }
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: expiresIn })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

    try {
      const decryptedEmail = decryptData(email);
      const decryptedPassword = decryptData(password);

      
    const user = await User.login(decryptedEmail, decryptedPassword)
     console.log(user);
        // create a token
    const token = createToken(user._id,user.role)

    res.status(200).json({email, token,
      
      table: user.table,
      role: user.role,
      isBlocked: user.isBlocked,
  })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password,table,role} = req.body

  try {
    const user = await User.signup(email, password,table,role)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }
