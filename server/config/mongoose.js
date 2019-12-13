const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bicycle_marketplace', { useNewUrlParser: true });

module.exports = mongoose;