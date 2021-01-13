const express = require('express');

const TechnologyCtrl = require('../controllers/technology-ctrl');

const router = express.Router();

router.post('/technology', TechnologyCtrl.createTechnology);
router.put('/technology/:id', TechnologyCtrl.updateTechnology);
router.delete('/technology/:id', TechnologyCtrl.deleteTechnology);
router.get('/technology/id/:id', TechnologyCtrl.getTechnologyById);
router.get('/technology/container/:id', TechnologyCtrl.getTechnologyByContainerId);
router.get('/alltechnology/greenhouse/:greenhouse', TechnologyCtrl.getAllTechnology);

module.exports = router