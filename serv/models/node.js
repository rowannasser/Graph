const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    left_coordinate: {
        type: Number,
        required: true
    },
    top_coordinate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Node', NodeSchema);