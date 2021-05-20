const Configuration = require('../models/configuration')

createConfiguration = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a configuration',
        })
    }

    const configuration = new Configuration(body)

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

updateConfiguration = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Configuration.findOne({ _id: req.params.id }, (err, configuration) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'configuration not found!',
            })
        }
        configuration.name = body.name
        configuration.containerId = body.containerId
        configuration.modules = body.modules
        configuration.greenhouse = body.greenhouse
        configuration
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: configuration._id,
                    message: 'configuration updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'configuration not updated!',
                })
            })
    })
}

deleteConfiguration = async (req, res) => {
    await Configuration.findOneAndDelete({ _id: req.params.id }, (err, configuration) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!configuration) {
            return res
                .status(404)
                .json({ success: false, error: `configuration not found` })
        }

        return res.status(200).json({ success: true, data: configuration })
    }).catch(err => console.log(err))
}

getConfigurationById = async (req, res) => {
    await Configuration.findOne({ _id: req.params.id }, (err, configuration) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!configuration) {
            return res
                .status(404)
                .json({ success: false, error: `configuration not found` })
        }
        return res.status(200).json({ success: true, data: configuration })
    }).catch(err => console.log(err))
}

getConfigurations = async (req, res) => {
    await Configuration.find({ greenhouse:req.params.greenhouse }, (err, configurations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!configurations.length) {
            return res
                .status(404)
                .json({ success: false, error: `configuration not found` })
        }
        return res.status(200).json({ success: true, data: configurations })
    }).catch(err => console.log(err))
}

module.exports = {
    createConfiguration,
    updateConfiguration,
    deleteConfiguration,
    getConfigurations,
    getConfigurationById
}