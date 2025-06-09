const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route dengan pagination
router.get('/orders', dashboardController.getOrdersWithPagination);

// Route TANPA pagination
router.get('/allorders', dashboardController.getAllOrdersWithoutPagination);

module.exports = router;