const Report = require('../models/report')

createReport = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a report',
        })
    }

    const report = new Report(body)

    if (!report) {
        return res.status(400).json({ success: false, error: err })
    }

    report
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: report._id,
                message: 'report created!',
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({
                error,
                message: 'report not created!',
            })
        })
}

deleteReport = async (req, res) => {
    await Report.findOneAndDelete({ _id: req.params.id }, (err, report) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!report) {
            return res
                .status(404)
                .json({ success: false, error: 'report not found' })
        }

        return res.status(200).json({ success: true, data: report })
    }).catch(err => console.log(err))
}

getReports = async (req, res) => {
    await Report.find({}, (err, reports) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!reports.length) {
            return res
                .status(404)
                .json({ success: false, error: 'reports not found' })
        }
        return res.status(200).json({ success: true, data: reports })
    }).catch(err => console.log(err))
}

module.exports = {
    createReport,
    deleteReport,
    getReports,
}