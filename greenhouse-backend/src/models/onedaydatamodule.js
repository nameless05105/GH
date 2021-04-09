const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Onedaydata = new Schema({
    type: { type: String, required: true },
    data: Array,
    id: { type: String }
});

module.exports = mongoose.model('one_day_data_modules', Onedaydata)