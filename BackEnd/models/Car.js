const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    carname : {
        type : String,
        required : true
    },
    modelname : {
        type : String,
        require : true
    },
    carimageurl : String
})

module.exports = mongoose.model('Car',CarSchema);