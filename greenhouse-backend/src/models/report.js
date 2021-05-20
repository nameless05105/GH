const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Report = new Schema(
    {
        culture: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        ph: { type: String, required: true },
        ec: { type: String, required: true },
        seedingDensity: { type: String, required: true },
        img: { type: String },
        sensors: [{
            type: { type: String },
            key: { type: String },
            id: { type: String },
            _id: { type: String },
            values: [{
                date: { type: String },
                value: { type: Number },
                _id: false
            }]
        }],
        username: { type: String, required: true },
    },
    { timestamps: false },
)

module.exports = mongoose.model('report', Report)