const express = require('express');
const app = express();

require('./db');
const session = require('express-session');
const path = require('path');
const auth = require('./auth.js');

app.listen(3000);