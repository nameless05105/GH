const Parameter = require('../models/parameter')

createParam = (req, res) => {
    const body = req.body
    console.log(body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a configuration',
        })
    }

    const configuration = new Parameter (body)

    if (!configuration) {
        return res.status(400).json({ success: false, error: err })
    }

    configuration
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: configuration._id,
                message: 'configuration created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'configuration not created!',
            })
        })
}

updateParameter = async (req, res) => {
    const body = req.body
    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Parameter.findOne({ name: body.name }, (err, parameter) => {
        if (err) {
            return res.status(400).json({
                err,
                message: 'not found!',
            })
        }
        console.log(parameter)
        // parameter.values = parameter.values.push({value:body.value, date:body.date});
        parameter
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: parameter._id,
                    message: 'updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'not updated!',
                })
            })
    })
}

module.exports = {
    updateParameter,
    createParam
}