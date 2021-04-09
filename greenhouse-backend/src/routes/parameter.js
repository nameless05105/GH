const express = require('express');

const ParameterCtrl = require('../controllers/parameter-ctrl');

const router = express.Router();

router.post('/parameter/', ParameterCtrl.updateParameter);
router.post('/module/', ParameterCtrl.createParam);

module.exports = router