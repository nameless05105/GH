const express = require('express');

const ModuleCtrl = require('../controllers/module-ctrl');

const router = express.Router();

router.post('/module/', ModuleCtrl.createModule);
router.get('/modules/', ModuleCtrl.getModules);

module.exports = router