const express = require('express');

const ContainerCtrl = require('../controllers/container-ctrl');

const router = express.Router();

router.post('/container/', ContainerCtrl.createContainer);
router.put('/container/:id', ContainerCtrl.updateContainer);
router.delete('/container/:id', ContainerCtrl.deleteContainer);
router.get('/container/id/:id', ContainerCtrl.getContainerById);
router.get('/container/name/:name', ContainerCtrl.getContainerByName);
router.get('/containers/greenhouse/:greenhouse', ContainerCtrl.getContainers);
router.get('/containersname', ContainerCtrl.getContainersName);

module.exports = router