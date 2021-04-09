const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Parameter = new Schema(
    {
        name: String,
        values : {
            value: String,
            date: String
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('parameters', Parameter)