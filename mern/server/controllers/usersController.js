const User = require('../models/userModel');

// Контролер за вземане на всички потребители
const getAllUsers = async (req, res) => {
  try {
    // Намерете всички потребители в базата данни
    const users = await User.find();
    res.json(users); // Изпратете отговор със списъка от потребители
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Намерете потребителя по id и го изтрийте
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params; // ID на потребителя за редактиране
  const { email, table, role } = req.body; // Новите данни за потребителя

  try {
    // Проверка дали потребителят съществува
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Актуализация на данните на потребителя
    user.email = email;
    user.table = table;
    user.role = role;

    // Запазване на промените в базата данни
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const blockUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Намираме потребителя в базата данни
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Потребителят не беше намерен' });
    }

    // Променяме полето за блокиране в модела на потребителя
    user.isBlocked = true; // Предположим, че имате поле isBlocked в модела

    // Запазваме промените
    await user.save();

    res.status(200).json({ message: 'Потребителят беше блокиран успешно' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const unblockUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Намираме потребителя в базата данни
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Потребителят не беше намерен' });
    }

    // Променяме полето за блокиране в модела на потребителя
    user.isBlocked = false; // Предположим, че имате поле isBlocked в модела

    // Запазваме промените
    await user.save();

    res.status(200).json({ message: 'Потребителят беше отблокиран успешно' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = { 
  getAllUsers,
  deleteUser,
  editUser,
  blockUser,
  unblockUser,
};