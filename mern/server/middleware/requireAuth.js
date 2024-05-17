const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// 
exports.requireAuth = async (req, res, next) => {
  try {
    // Проверка за наличие на JWT токен
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
    

    // Извличане на токена и верификация
    const token = authorization.split(' ')[1];
    const { _id } = jwt.verify(token, 'secretkey123');

    // Намиране на потребителя по _id
    const user = await User.findById(_id).select('_id');
    if (!user) {
      throw new Error('User not found');
    }
    if (user.isBlocked == true) {
      throw Error('User is blocked!')
    }

    // Записване на потребителя в req.user за бъдеща употреба
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.clearCookie('user');
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

exports.userMiddleware = async (req, res, next) => {
  if (req.user && req.user.role === "guest") {
    // Ако ролята е правилна, продължи към следващия middleware или рута
    next();
  } else {
    // Ако ролята не е правилна, върни грешка за неоторизиран достъп
    return res.status(403).json({ error: 'Unauthorized access' });
  }
};

exports.cookMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
      return res.status(400).json({ message: "Cook access denied" });
    }
  next();
};

exports.waiterMiddleware = (req, res, next) => {
  const { authorization } = req.headers

  const user = this.findOne({ email })

  if (user.isBlocked == true) {
    throw Error('User is blocked!')
  }

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  
    const { _id } = jwt.verify(token, 'secretkey123')
   console.log(_id);
    req.user = User.findOne({ _id }).select('_id')

  if (req.user && req.user.role === "waiter") {
    // Ако ролята е правилна, продължи към следващия middleware или рута
    next();
  } else {
    // Ако ролята не е правилна, върни грешка за неоторизиран достъп
    return res.status(403).json({ error: 'Unauthorized access' });
  }
};

// exports.requireAuth = async (role,req, res, next) => {
//   // verify user is authenticated
//   const { authorization } = req.headers

//   const user = await this.findOne({ role } == "admin")

//   if (user.isBlocked == true) {
//     throw Error('User is blocked!')
//   }

//   if (!authorization) {
//     return res.status(401).json({error: 'Authorization token required'})
//   }

//   const token = authorization.split(' ')[1]

//   try {
//     const { _id } = jwt.verify(token, 'secretkey123')
//    console.log(_id);
//     req.user = await User.findOne({ _id }).select('_id')
//     console.log(user);
//     next()

//   } catch (error) {
//     console.log(error)
//     res.clearCookie("user");
//     res.status(401).json({error: 'Request is not authorized'})
//   }
// }

