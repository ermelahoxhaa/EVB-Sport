const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/productController');

const upload = multer({ dest: 'uploads/' });

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', upload.single('image'), controller.createProduct);
router.put('/:id', upload.single('image'), controller.updateProduct);
router.delete('/:id', controller.deleteProduct);
router.get('/logs/all', controller.getModifications);

module.exports = router;
