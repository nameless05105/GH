const express = require('express');

const ConfigurationCtrl = require('../controllers/configuration-ctrl');

const router = express.Router();

router.post('/configuration', ConfigurationCtrl.createConfiguration);
router.put('/configuration/:id', ConfigurationCtrl.updateConfiguration);
router.delete('/configuration/:id', ConfigurationCtrl.deleteConfiguration);
router.get('/configuration/id/:id', ConfigurationCtrl.getConfigurationById);
router.get('/configurations/greenhouse/:greenhouse', ConfigurationCtrl.getConfigurations);

module.exports = router