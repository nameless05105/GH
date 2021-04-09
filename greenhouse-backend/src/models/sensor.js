const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sensor = new Schema(
    {
        components: { type: {
            type: String,
            number: String,
            values: Array
        }}
    },
    { timestamps: false },
)

module.exports = mongoose.model('module1', Sensor)