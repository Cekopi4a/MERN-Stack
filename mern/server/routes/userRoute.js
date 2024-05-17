const express = require('express')
const {requireAuth,userMiddleware, waiterMiddleware} = require('../middleware/requireAuth')
const { getAllUsers, deleteUser, editUser, blockUser, unblockUser } = require('../controllers/usersController');

const router = express.Router()

router.use(requireAuth);
//User
router.get("/getAllUsers", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/editUser/:id", editUser)

router.put("/blockUser/:id", blockUser);
router.put("/unBlockUser/:id", unblockUser);




module.exports = router;