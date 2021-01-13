const Container = require('../models/container')

createContainer = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const container = new Container(body)
    console.log(body)

    if (!container) {
        return res.status(400).json({ success: false, error: err })
        
    }

    container
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: container._id,
                message: 'container created!',
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({
                error,
                message: 'container not created!',
            })
        })
}

updateContainer = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Container.findOne({ _id: req.params.id }, (err, container) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'container not found!',
            })
        }
        container.name = body.name
        container.address = body.address
        container.channel = body.channel
        container.sensors = body.sensors
        container.devices = body.devices
        container
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: container._id,
                    message: 'container updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'container not updated!',
                })
            })
    })
}

deleteContainer = async (req, res) => {
    await Container.findOneAndDelete({ _id: req.params.id }, (err, container) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!container) {
            return res
                .status(404)
                .json({ success: false, error: 'container not found' })
        }

        return res.status(200).json({ success: true, data: container })
    }).catch(err => console.log(err))
}

getContainerById = async (req, res) => {
    await Container.findOne({ _id: req.params.id }, (err, container) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!container) {
            return res
                .status(404)
                .json({ success: false, error: 'container not found' })
        }
        return res.status(200).json({ success: true, data: container})
    }).catch(err => console.log(err))
}

getContainerByName = async (req, res) => {
    await Container.findOne({ name: req.params.name }, (err, container) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!container) {
            return res
                .status(404)
                .json({ success: false, error: 'container not found' })
        }
        return res.status(200).json({ success: true, data: container })
    }).catch(err => console.log(err))
}

getContainers = async (req, res) => {
    await Container.find({ greenhouse:req.params.greenhouse }, (err, containers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!containers.length) {
            return res
                .status(404)
                .json({ success: false, error: 'container not found' })
        }
        return res.status(200).json({ success: true, data: containers })
    }).catch(err => console.log(err))
}

getContainersName = async (req, res) => {
    await Container.find({}, {name:1, _id:0}, (err, containers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!containers.length) {
            return res
                .status(404)
                .json({ success: false, error: 'container not found' })
        }
        let containersArray = containers.map(function(obj) {
            return obj.name;
          });
        return res.status(200).json(containersArray)
    }).catch(err => console.log(err))
}


module.exports = {
    createContainer,
    updateContainer,
    deleteContainer,
    getContainers,
    getContainerById,
    getContainerByName,
    getContainersName
}