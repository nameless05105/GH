const Onedaydata = require('../models/onedaydatamodule');
const e = require('../modules/event.js');

createModule = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a greenhouse',
        })
    }

    const onedaydata  = new Onedaydata (body)

    if (!onedaydata ) {
        return res.status(400).json({ success: false, error: err })
    }

    onedaydata 
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: onedaydata._id,
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

getModules = async (req, res) => {
    e.emit('send',"888");
    console.log("kkfkf1");
    // e.on('send2', (res) => {
    //     console.log("2");
    //     return res.status(200).json({ success: true, data: res })
    // });
    await e.on('send2', (res) => {
        return res.status(200).json({ success: true, data: res })
    }).catch(err => console.log(err))
}

module.exports = {
    getModules,
    createModule
}