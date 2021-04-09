const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Container = new Schema(
    {
        name: { type: String, required: true },
        address: { type: Number, required: true },
        channel: { type: Number, required: true },
        greenhouse: { type: String, required: true },
        sensors: [{
            count: { type: Number },
            period: { type: Number},
            _id: false,
            structure: [{
                type: { type: String },
                count: { type: Number },
                _id: false
            }]
        }],
        devices: [{
            count: { type: Number },
            period: { type: Number },
            _id: false,
            structure: [{
                type: { type: String },
                time_type: { type: String },
                frequency: { type: Number },
                period: { type: Number },
                bias: { type: Number },
                count: { type: Number },
                _id: false
            }]
        }],
        wifi: {
            name: { type: String },
            pass: { type: String },
            ip: { type: String }
        }
    },
    { timestamps: false },
)

module.exports = mongoose.model('containers', Container)