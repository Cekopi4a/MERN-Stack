// Примерен код за насочване на маршрутите към контролера
const express = require('express');
const { getCollectionData,addProductToCollection,deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Маршрут за вземане на данни от колекция
router.post('/add', addProductToCollection);
router.get('/:id', getCollectionData);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
