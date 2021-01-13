const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Module = new Schema(
    {
        type: { type: String, required: true },
        components: { type: {
            component: String,
            number: String,
            values: Array
        }, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('modules', Module)