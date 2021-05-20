const express = require('express');

const ReportCtrl = require('../controllers/report-ctrl');

const router = express.Router();

router.post('/report/', ReportCtrl.createReport);
router.delete('/report/:id', ReportCtrl.deleteReport);
router.get('/report/id/:id', ReportCtrl.getReportById);
router.get('/report/', ReportCtrl.getReports);

module.exports = router