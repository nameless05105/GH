const express = require('express');

const GreenhouseCtrl = require('../controllers/greenhouse-ctrl');

const router = express.Router();

router.post('/greenhouse', GreenhouseCtrl.createGreenhouse);
router.get('/greenhouses', GreenhouseCtrl.getGreenhouses);

module.exports = router