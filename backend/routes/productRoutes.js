const express = require('express');
const router = express.Router();
const multer = require('multer');
const AuthMiddleware = require('../middleware/authMiddleware');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });


router.get('/', (req, res, next) => {
  const referer = req.headers.referer || '';
  const isDirectBrowserAccess = !referer.includes('localhost:8080');
  
  if (isDirectBrowserAccess) {
    AuthMiddleware.authenticateToken(req, res, () => {
      AuthMiddleware.authorizeRole(1)(req, res, next);
    });
  } else {
    next();
  }
}, getAllProducts);

router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
