const express = require('express');
const AboutUsController = require('../controllers/AboutUsController');

const router = express.Router();

router.get('/', AboutUsController.getAboutUs); // Endpoint to fetch About Us data
router.put('/', AboutUsController.updateAboutUs); // endpoint to update About Us data

module.exports = router;