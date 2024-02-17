const mongoose = require('mongoose');

const EdgeSchema = new mongoose.Schema({
  source_node_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
    required: true
  },
  version: {
    type: Date,
    required: true
  },
  target_node_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
    required: true
  }
});

module.exports = mongoose.model('Edge', EdgeSchema);