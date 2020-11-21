const express = require('express');
const router = express.Router();
const carParkingCtrl = require('../controllers/carParking.controller');

router.post('/manageCarParking', carParkingCtrl.manageCarParking);

module.exports = router;