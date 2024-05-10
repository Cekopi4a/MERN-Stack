require('dotenv').config()
const express =require ('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors =require ('cors');
const mongoose = require ('mongoose');
const WebSocket = require('ws');
const records =require ('./routes/record.js');
const alcoholfree =require ('./routes/alcoholfree.js');
const dessert =require ('./routes/dessert.js');
const grill =require ('./routes/grill.js');
const hot_dish =require ('./routes/hot_dish.js');
const _hlqb =require ('./routes/_hlqb.js');
const maindish =require ('./routes/maindish.js');
const salad =require ('./routes/salad.js');
const soup =require ('./routes/soup.js');
const topping =require ('./routes/topping.js');
const login =require ('./routes/login.js');
const authRoute =require ('./routes/authRoute.js');
const cartRoute = require('./routes/cart.js');
const orderRoute = require("./routes/orderRoute");
const callRoute = require("./routes/callRoute");
const userRoute = require("./routes/userRoute");


const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Нова връзка установена.');

  ws.on('message', function incoming(message) {
    console.log('Получено съобщение от маса:', message.toString('utf8'));

    // Пример: изпращане на съобщение до всички свързани клиенти
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Извикаха ви от маса, ${message}`);
      }
    });
  });
});

console.log('WebSocket сървър стартиран на порт 8080');


const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());


//Routes
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/alcohol", records);
app.use("/alcfree", alcoholfree);
app.use("/dessert", dessert );
app.use("/grill", grill);
app.use("/hlqb", _hlqb);
app.use("/hotdish", hot_dish);
app.use("/maindish", maindish);
app.use("/salad", salad);
app.use("/soup", soup);
app.use("/topping", topping);
app.use("/login", login);
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/call', callRoute);
app.use('/api/users', userRoute);





//Global Error Hnadler
app.use((err, req, res, next) => {
  err.statuCode = err.statuCode || 500;
  err.status = err.status || 'error';
   
  res.status(err.statuCode).json({
    status: err.status,
    message:err.message,
  });
});


//Mongo DB
mongoose.connect('mongodb+srv://analytics:Cekopi4a@cluster0.slg4lq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(()=> console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Failed to connect!!!',error))


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
