const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/ProductController');


//Rutas del CRUD 
router.post('/', ProductController.addProducts);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.patch('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router; 