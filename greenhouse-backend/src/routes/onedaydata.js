const express = require('express');

const onedaydataCtrl = require('../controllers/onedaydata-ctrl');

const router = express.Router();

router.post('/onedaydatamodule/', onedaydataCtrl.createModule);
router.get('/onedaydatamodules/', onedaydataCtrl.getModules);

module.exports = router