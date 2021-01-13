const Greenhouse= require('../models/greenhouse')

createGreenhouse = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a greenhouse',
        })
    }

    const greenhouse = new Greenhouse(body)

    if (!greenhouse) {
        return res.status(400).json({ success: false, error: err })
    }

    greenhouse
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: greenhouse._id,
                message: 'greenhouse created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'greenhouse not created!',
            })
        })
}

getGreenhouses = async (req, res) => {
    await Greenhouse.find({}, (err, greenhouses) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!greenhouses.length) {
            return res
                .status(404)
                .json({ success: false, error: 'greenhouse not found' })
        }
        return res.status(200).json({ success: true, data: greenhouses })
    }).catch(err => console.log(err))
}

module.exports = {
    createGreenhouse,
    getGreenhouses
}