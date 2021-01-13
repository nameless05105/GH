const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Technology = new Schema(
    {
        name: { type: String, required: true },
        container: { type: String, required: true },
        temperature: { type: String, required: true },
        humidity: { type: String, required: true },
        illumination: { type: String, required: true },
        greenhouse: { type: String, required: true },
    },
    { timestamps: false },
)

module.exports = mongoose.model('technology', Technology)