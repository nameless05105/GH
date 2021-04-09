const express = require('express');

const SensorCtrl = require('../controllers/sensor-ctrl');

const router = express.Router();
router.get('/sensors/days', SensorCtrl.getDaysList);
router.post('/sensor/', SensorCtrl.createSensor);
router.get('/sensors/', SensorCtrl.getSensorForDays);

module.exports = router