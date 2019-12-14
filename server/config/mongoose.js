const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bicycle_marketplace', { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false, useCreateIndex : true });

module.exports = mongoose;
