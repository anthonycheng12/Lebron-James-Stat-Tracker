const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const User = new mongoose.Schema({
    username: {type: String, required: true},
	  email: {type: String, required: true},
    password: {type: String, unique: true, required: true},
    lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List', required: false }]
  });

  const Photo = new mongoose.Schema({
    publisher: {type: String},
    url: {type: String},
    team: {type: String},
    description: {type: String}
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

Photo.plugin(URLSlugs('publisher'));
mongoose.model('User', User);
mongoose.model('Photo', Photo);
mongoose.connect(dbconf);