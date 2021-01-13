const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Container = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        channel: { type: String, required: true },
        greenhouse: { type: String, required: true },
        sensors: [{
            count: { type: String },
            period: { type: String},
            _id: false,
            structure: [{
                type: { type: String },
                count: { type: String },
                _id: false
            }]
        }],
        devices: [{
            count: { type: String },
            period: { type: String },
            _id: false,
            structure: [{
                type: { type: String },
                time_type: { type: String },
                frequency: { type: String },
                period: { type: String },
                bias: { type: String },
                count: { type: String },
                _id: false
            }]
        }]
    },
    { timestamps: false },
)

module.exports = mongoose.model('containers', Container)