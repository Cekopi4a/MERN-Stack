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

const models = {
  Alcohol: Alcohol,
  alcfree: AlcoholFree,
  dessert: Dessert,
  grill: Grill,
  bread: Breads,
  hotdish: HotDishes,
  maindish: MainDishes,
  salad: Salad,
  soup: Soup,
  topping: Topping,
};

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
          collectionData = await Dessert.find(); 
          break;
          case 'grill':
          collectionData = await Grill.find(); 
          break;
          case 'bread':
          collectionData = await Breads.find(); 
          break;
          case 'hotdish':
          collectionData = await HotDishes.find(); 
          break;
          case 'maindish':
          collectionData = await MainDishes.find(); 
          break;
          case 'salad':
          collectionData = await Salad.find(); 
          break;
          case 'soup':
          collectionData = await Soup.find(); 
          break;
          case 'topping':
          collectionData = await Topping.find(); 
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
    const { collection, id } = req.params;
    console.log(collection,id);
    const model = models[collection];
  
    if (!model) {
      return res.status(400).send({ error: 'Invalid collection' });
    }
  
    try {
      const deletedProduct = await model.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).send({ error: 'Product not found' });
      }
      res.send(deletedProduct);
    } catch (error) {
      res.status(500).send({ error: 'Server error' });
    }
  };


const getCurrentProduct = async (req, res) => {
  let { collection, id } = req.params;

  try {
      let product;
      switch (collection) {
          case 'Alcohol':
              product = await Alcohol.findById(id); 
              break;
          case 'alcfree':
              product = await AlcoholFree.findById(id); 
              break;
          case 'dessert':
              product = await Dessert.findById(id); 
              break;
          case 'grill':
              product = await Grill.findById(id); 
              break;
          case 'bread':
              product = await Breads.findById(id); 
              break;
          case 'hotdish':
              product = await HotDishes.findById(id); 
              break;
          case 'maindish':
              product = await MainDishes.findById(id); 
              break;
          case 'salad':
              product = await Salad.findById(id); 
              break;
          case 'soup':
              product = await Soup.findById(id); 
              break;
          case 'topping':
              product = await Topping.findById(id); 
              break;
          default:
              return res.status(400).json({ error: 'Невалидно име на колекция' });
      }

      if (!product) {
          return res.status(404).json({ error: 'Продуктът не е намерен' });
      }

      res.status(200).json(product);
  } catch (error) {
      console.error('Грешка при вземане на данни от колекция:', error);
      res.status(500).json({ error: 'Грешка при вземане на данни' });
  }
};

const updateProductById = async (req, res) => {
  let { collection, id } = req.params;
  const updateData = req.body; // Не е нужно да се използва деструктуриране тук

  const collectionsMap = {
    'Alcohol': Alcohol,
    'alcfree': AlcoholFree,
    'dessert': Dessert,
    'grill': Grill,
    'bread': Breads,
    'hotdish': HotDishes,
    'maindish': MainDishes,
    'salad': Salad,
    'soup': Soup,
    'topping': Topping,
  };

  try {
    const Model = collectionsMap[collection];

    if (!Model) {
      return res.status(400).json({ error: 'Невалидно име на колекция' });
    }

    const updatedProduct = await Model.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Продуктът не е намерен' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Грешка при актуализиране на продукта:', error);
    res.status(500).json({ error: 'Грешка при актуализиране на продукта' });
  }
};


  module.exports = { 
    getCollectionData,
    addProductToCollection,
    deleteProduct,
    getCurrentProduct,
    updateProductById,
  };