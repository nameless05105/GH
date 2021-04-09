const Sensor = require('../models/sensor')

createSensor = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a greenhouse',
        })
    }

    const sensor  = new Sensor (body)

    if (!sensor ) {
        return res.status(400).json({ success: false, error: err })
    }

    sensor 
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: sensor._id,
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

getDaysList = async (req, res) => {
    await Sensor.find({}, (err, sensors) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!sensors.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Sensors not found' })
        }
        let days = [];
        // for (let sensor in sensors) {
        //     console.log(sensor['components']);
        //     // for (let value in sensor['components']['values']) {
        //     //     if (days.indexOf(value.date.slice(0,9)) == -1 ){
        //     //         days.push(value.date.slice(0,9));
        //     //     }
        //     // }
        // }
        sensors.forEach(sensor => {
            // for (let key in sensor.components) {
            //     console.log(key);
            // }
            // console.log(Object.keys(sensor.components));
            sensor.components.values.forEach(value =>
                console.log(value))
            // console.log(sensor.components.values)
            // sensor.components.values.forEach(value => {
            //     console.log(sensors)
            //     if (data.indexOf(value.date.slice(0,9)) == -1 ){
            //         data.push(value.date.slice(0,9));
            //     }
            // });
        });
        return res.status(200).json({ success: true, data: days })
    }).catch(err => console.log(err))
}

getSensorForDays = async (req, res) => {
    await Sensor.find({'components.values.date': {'$regex': '28-1-2020'}}, (err, sensors) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!sensors.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Sensors not found' })
        }
        
        return res.status(200).json({ success: true, data: sensors })
    }).catch(err => console.log(err))
}

module.exports = {
    getDaysList,
    createSensor,
    getSensorForDays
}