const mongoose = require('mongoose');

const User = new mongoose.Schema({
    // username provided by authentication plugin
    // password hash provided by authentication plugin
    lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
  });

const Player = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    ppg: {type: String, required: false},
    reb: {type: String, required: false},
    ast: {type: String, required: false},
    stl: {type: String, required: false},
    blk: {type: String, required: false},
    tov: {type: String, required: false}
  }, {
    _id: true
  });

const PlayerList = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    name: {type: String, required: true},
    createdAt: {type: Date, required: true},
    players: [Player]
  });

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/YOUR_DATABASE_NAME_HERE';
}

mongoose.model('User', User);
mongoose.model('PlayerList', PlayerList);
mongoose.model('Player', Player);
mongoose.connect(dbconf);