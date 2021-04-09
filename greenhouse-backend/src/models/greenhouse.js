const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Greenhouse = new Schema(
    {
        name: { type: String, required: true },
        technologies: { type: String }
    },
    { timestamps: false },
)

module.exports = mongoose.model('greenhouse', Greenhouse)