// Примерен код за насочване на маршрутите към контролера
const express = require('express');
const { getCollectionData,addProductToCollection,deleteProduct,getCurrentProduct, updateProductById} = require('../controllers/productController');

const router = express.Router();

// Маршрут за вземане на данни от колекция
router.post('/add', addProductToCollection);
router.get('/:id', getCollectionData);
router.delete('/delete/:collection/:id', deleteProduct);
router.get('/getOne/:collection/:id', getCurrentProduct);
router.put('/updateProduct/:collection/:id', updateProductById);

module.exports = router;
