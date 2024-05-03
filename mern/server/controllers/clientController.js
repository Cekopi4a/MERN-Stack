const CallClient = require("../models/callClient");

const callClient = async (req, res) => {
    try {
      const { userTable } = req.body;
      const user_id = req.user._id;
      console.log('User ID from cookie:', user_id);
      console.log(userTable);
      
  
      const call = new CallClient({ user_id,userTable });
      const savedCall = await call.save();
  
      // Вместо да върнете целия обект, върнете само нужната информация (например, идентификатора на поръчката)
      res.status(200).json({ order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    callClient,
  }