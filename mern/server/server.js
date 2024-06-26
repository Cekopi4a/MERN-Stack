require('dotenv').config()
const express =require ('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors =require ('cors');
const mongoose = require ('mongoose');
const WebSocket = require('ws');
const http = require('http');
const { Server } = require('socket.io');
const login =require ('./routes/login.js');
const authRoute =require ('./routes/authRoute.js');
const cartRoute = require('./routes/cart.js');
const orderRoute = require("./routes/orderRoute");
const callRoute = require("./routes/callRoute");
const userRoute = require("./routes/userRoute");
const product = require("./routes/product");


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



const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Адресът на вашето React приложение
    methods: ["GET", "POST", "PUT"]
  }
});

//Routes
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/login", login);
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/call', callRoute);
app.use('/api/users', userRoute);
app.use('/api/product', product);



io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });
});

app.set('io', io); // прави io достъпно в app обекта


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
mongoose.connect('mongodb+srv://analytics:Cekopi4a@cluster0.slg4lq3.mongodb.net/Restaurant?retryWrites=true&w=majority&appName=Cluster0',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=> console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Failed to connect!!!',error))


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
