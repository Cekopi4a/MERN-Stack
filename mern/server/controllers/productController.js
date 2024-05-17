const Alcohol = require("../models/alcohol");
const AlcoholFree = require("../models/alcoholfree");
const Dessert = require("../models/dessert");
const Grill = require("../models/grill");
const Breads = require("../models/bread");
const HotDishes = require("../models/hotdish");
const MainDishes = require("../models/maindish");
const Salad = require("../models/salad");
const Soup = require("../models/soup");
const Topping = require("../models/topping");

// Контролер за добавяне на продукт към колекция
const addProductToCollection = async (req, res) => {
  const { collectionName, name, description, price, weight, volume, imageUrl} = req.body;

  try {
    let newProduct;
    switch (collectionName) {
      case 'Alcohol':
        newProduct = new Alcohol({ name, description, price,weight,volume,imageUrl });
        break;
        case 'Alcohol-free':
          newProduct = new AlcoholFree({ name, description, price,weight,volume,imageUrl });
          break;
          case 'Dessert':
            newProduct = new Dessert({ name, description, price,weight,volume,imageUrl });
            break;
            case 'Grill':
              newProduct = new Grill({ name, description, price,weight,volume,imageUrl });
              break;
              case 'Hlqb':
                newProduct = new Breads({ name, description, price,weight,volume,imageUrl });
                break;
                case 'Hot-Dishes':
                  newProduct = new HotDishes({ name, description, price,weight,volume,imageUrl });
                  break;
                  case 'Main-Dishes':
                    newProduct = new MainDishes({ name, description, price,weight,volume,imageUrl });
                    break;
                    case 'Salad':
                      newProduct = new Salad({ name, description, price,weight,volume,imageUrl });
                      break;
                      case 'Soup':
                        newProduct = new Soup({ name, description, price,weight,volume,imageUrl });
                        break;
                        case 'Topping':
                         newProduct = new Topping({ name, description, price,weight,volume,imageUrl });
                       break;
      default:
        return res.status(400).json({ error: 'Невалидно име на колекция' });
    }

    // Записване на новия продукт в съответната колекция
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Грешка при добавяне на продукт:', error);
    res.status(500).json({ error: 'Неуспешно добавяне на продукт' });
  }
};



const getCollectionData = async (req, res) => {
    const collectionName  = req.params.id; // Получаваме името на колекцията от URL параметър
  
    try {
      let collectionData;
      switch (collectionName) {
        case 'alcohol':
          collectionData = await Alcohol.find(); // Връщаме всички данни от колекцията за алкохол
          break;
        case 'alcfree':
          collectionData = await AlcoholFree.find(); // Връщаме всички данни от колекцията за супи
          break;
        case 'dessert':
          collectionData = await Dessert.find(); // Връщаме всички данни от колекцията за хляб
          break;
          case 'grill':
          collectionData = await Grill.find(); // Връщаме всички данни от колекцията за хляб
          break;
          case 'bread':
          collectionData = await Breads.find(); // Връщаме всички данни от колекцията за хляб
          break;
          case 'hotdish':
          collectionData = await HotDishes.find(); // Връщаме всички данни от колекцията за хляб
          break;
          case 'maindish':
          collectionData = await MainDishes.find(); // Връщаме всички данни от колекцията за хляб
          break;
          case 'salad':
          collectionData = await Salad.find(); // Връщаме всички данни от колекцията за хляб
          break;
          case 'soup':
          collectionData = await Soup.find(); // Връщаме всички данни от колекцията за хляб
          break;
          case 'topping':
          collectionData = await Topping.find(); // Връщаме всички данни от колекцията за хляб
          break;
        default:
          return res.status(400).json({ error: 'Невалидно име на колекция' });
      }
  
      res.status(200).json(collectionData);
    } catch (error) {
      console.error('Грешка при вземане на данни от колекция:', error);
      res.status(500).json({ error: 'Грешка при вземане на данни' });
    }
  };

  const deleteProduct = async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Намерете потребителя по id и го изтрийте
      const deletedUser = await Alcohol.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully', user: deletedUser });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = { 
    getCollectionData,
    addProductToCollection,
    deleteProduct,
  };