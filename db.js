const mongoose = require('mongoose');

const User = new mongoose.Schema({
    // username provided by authentication plugin
    // password hash provided by authentication plugin
    lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
  });

const Player = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    ppg: {type: String, required: true},
    reb: {type: String, required: true},
    ast: {type: String, required: true},
    stl: {type: String, required: true},
    blk: {type: String, required: true},
    tov: {type: String, required: true}
  }, {
    _id: true
  });
