const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const CatEntry = mongoose.model('CatEntry', CatSchema);

module.exports = CatEntry;
