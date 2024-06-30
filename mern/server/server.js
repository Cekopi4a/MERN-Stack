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
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');


const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Нова връзка е установена.');

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    console.log('Получено съобщение:', parsedMessage);

    if (parsedMessage.action === 'call_waiter') {
      const table = parsedMessage.table;
      // Изпращане на съобщение до всички свързани клиенти
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ action: 'call_waiter', table }));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Връзката е затворена.');
  });

  ws.on('error', (error) => {
    console.error('WebSocket грешка:', error);
  });
});

console.log("helloо");


const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors(
  {
    origin: ["https://front-mern.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://front-mern.vercel.app", // Адресът на вашето React приложение
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware за CORS - заменете със своите настройки
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Рут за запазване на PDF файл
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/api/order/saveReceipt', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Файлът не е качен');
    }
    // Извличане на името на файла
    const filename = req.file.originalname;

    // Генериране на QR код за електронен вариант на касовата бележка
    const qrFilePath = `./uploads/qr_${filename}.png`;
    const qrUrl = `http://localhost:5050/api/order/receipts/${filename}`;
    await generateQRCode(qrUrl, qrFilePath);

    // Връщаме успешен отговор
    res.status(200).json({ message: 'Файлът е запазен успешно', qrUrl });
  } catch (error) {
    console.error('Грешка при запазване на файла:', error.message);
    res.status(500).json({ error: 'Грешка при запазване на файла' });
  }
});

// Рут за достъп до съхранен PDF файл
app.get('/api/order/receipts/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath);
});

// Функция за генериране на QR код
async function generateQRCode(data, filePath) {
  try {
    await QRCode.toFile(filePath, data);
  } catch (err) {
    throw new Error('Грешка при генериране на QR код');
  }
}

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


//Mongo DB        mongodb+srv://analytics:Cekopi4a@cluster0.slg4lq3.mongodb.net/
mongoose.connect('mongodb+srv://analytics:Cekopi4a@cluster0.slg4lq3.mongodb.net/Restaurant?retryWrites=true&w=majority&appName=Cluster0'
)
  .then(()=> console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Failed to connect!!!',error))


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
