const express = require('express');
const mongoose = require('mongoose');
const NBA = require('nba');

const curry = NBA.findPlayer('Stephen Curry');
console.log(curry);
let stats = function(player) {
    return NBA.stats.playerInfo({ PlayerID: player.playerId });
}
let ans = stats(curry);

ans.then(function(res) {
    console.log(res.playerHeadlineStats[0].pts);
})

/*function test(callback) {
    const ans = NBA.stats.playerInfo({ PlayerID: curry.playerId }).then();
    callback(ans);
}

test((ans) => {
    console.log(ans);
})*/

require('./db');
const session = require('express-session');
const path = require('path');
const auth = require('./auth.js');

const app = express();
const Player = mongoose.model('Player');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    if(req.session.user){
		Player.find((err, art) => {
			if(art.length){
				res.render('index', {user: req.session.user, players: art});
			} else{
				res.render('index', {user: req.session.user});
			}
		});
	} else{
		res.render('index');
	}
})

app.get('/player/add', (req, res) => {
    if(req.session.user){
        res.render('player-add');
    } else {
        res.redirect('/login');
    }
})

app.post('/player/add', (req, res) => {
    if(req.session.user){
        new Player({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }).save((err) => {
            if(err){
                console.log("Error adding your player")
                res.render('player-add');
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    auth.register(req.body.username, req.body.email, req.body.password, (err) => {
        res.render('register', {message: err.message});
    }, (user) => {auth.startAuthenticatedSession(req, user, (err) => {
            res.redirect('/');
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    auth.login(req.body.username, req.body.password, (err) => {
        res.render('login', {message: err.message});
    }, (user) => {auth.startAuthenticatedSession(req, user, (err) => {
            res.redirect('/');
        });
    });
});

app.listen(process.env.PORT || 3000);