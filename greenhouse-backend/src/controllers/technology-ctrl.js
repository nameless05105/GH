const Technology = require('../models/technology')

createTechnology = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a technology',
        })
    }

    const technology = new Technology(body)

    if (!technology) {
        return res.status(400).json({ success: false, error: err })
    }

    technology
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: technology._id,
                message: 'Technology created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Technology not created!',
            })
        })
}

updateTechnology = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Technology.findOne({ _id: req.params.id }, (err, technology) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Technology not found!',
            })
        }
        technology.name = body.name
        technology.containerId = body.containerId
        technology.blocks = body.blocks
        technology
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: technology._id,
                    message: 'Technology updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Technology not updated!',
                })
            })
    })
}

deleteTechnology = async (req, res) => {
    await Technology.findOneAndDelete({ _id: req.params.id }, (err, technology) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!technology) {
            return res
                .status(404)
                .json({ success: false, error: 'Tech not found' })
        }

        return res.status(200).json({ success: true, data: technology })
    }).catch(err => console.log(err))
}

getAllTechnology = async (req, res) => {
    await Technology.find({ greenhouse:req.params.greenhouse }, (err, allTechnology) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!allTechnology.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Technology not found' })
        }
        return res.status(200).json({ success: true, data: allTechnology })
    }).catch(err => console.log(err))
}

getTechnologyById = async (req, res) => {
    await Technology.findOne({ _id: req.params.id }, (err, technology) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!technology) {
            return res
                .status(404)
                .json({ success: false, error: 'Technology not found' })
        }
        return res.status(200).json({ success: true, data: technology })
    }).catch(err => console.log(err))
}

getTechnologyByContainerId = async (req, res) => {
    await Technology.findOne({ container: req.params.id }, (err, technology) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!technology) {
            return res
                .status(404)
                .json({ success: false, error: 'Technology not found' })
        }
        return res.status(200).json({ success: true, data: technology })
    }).catch(err => console.log(err))
}




module.exports = {
    createTechnology,
    updateTechnology,
    deleteTechnology,
    getAllTechnology,
    getTechnologyById,
    getTechnologyByContainerId
}