const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Configuration = new Schema(
    {
        name: { type: String, required: true },
        containerId: { type: String, required: true },
        greenhouse: { type: String, required: true },
        modules: [{
            action: { type: String, required: true },
            indicator: { type: String, required: true },
            sensor: { type: String, required: true },
            sign: { type: String, required: true },
            value:{ type: String, required: true },
            _id: false
        }]
    },
    { timestamps: false },
)

module.exports = mongoose.model('configurations', Configuration)