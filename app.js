const express = require('express');
const mongoose = require('mongoose');
require('./db');
const NBA = require('nba');
const session = require('express-session');
const path = require('path');
const auth = require('./auth.js');
const request = require('request');

const app = express();
const Photo = mongoose.model('Photo');
const Video = mongoose.model('Video');

const statsLBJOBJ = {
    "n2003": {"pts":20.9, "reb":5.5, "ast":5.9},
    "n2004": {"pts":27.2, "reb":7.4, "ast":7.2}, 
    "n2005": {"pts":31.4, "reb":7.0, "ast":6.6},
    "n2006": {"pts":27.3, "reb":6.7, "ast":6.0},
    "n2007": {"pts":30.0, "reb":7.9, "ast":7.2},
    "n2008": {"pts":28.4, "reb":7.6, "ast":7.2},
    "n2009": {"pts":29.7, "reb":7.3, "ast":8.6},
    "n2010": {"pts":26.7, "reb":7.5, "ast":7.0},
    "n2011": {"pts":27.1, "reb":7.9, "ast":6.2},
    "n2012": {"pts":26.8, "reb":8.0, "ast":7.3},
    "n2013": {"pts":27.1, "reb":6.9, "ast":6.3},
    "n2014": {"pts":25.3, "reb":6.0, "ast":7.4},
    "n2015": {"pts":25.3, "reb":7.4, "ast":6.8},
    "n2016": {"pts":26.4, "reb":8.6, "ast":8.7},
    "n2017": {"pts":27.5, "reb":8.6, "ast":9.1}
    };

// statsLBJOBJ.n2003.pts

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true,
}));

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

app.get('/', (req, res) => {
    if(req.session.user){
        res.render('default', {user: req.session.user});
    } else {
        res.render('default');
    }
});

function filterCavs(photo){
    if(photo.team === "cavs"){
        return true;
    }
    return false;
}

app.get('/photo/cavs', (req, res) => {
    if(req.session.user){
        Photo.find((err, photos) => {
            if(photos.length){
                const cavsPhotos = photos.filter(filterCavs);
                res.render('cavs', {user:req.session.user, cavsPhotos: cavsPhotos});
            } else {
                res.render('cavs', {user:req.session.user});
            }
        });
    } else {
        res.redirect('/login');
    }
});

function filterHeat(photo){
    if(photo.team === "heat"){
        return true;
    }
    return false;
}

app.get('/photo/heat', (req, res) => {
    if(req.session.user){
        Photo.find((err, photos) => {
            if(photos.length){
                const heatPhotos = photos.filter(filterHeat);
                res.render('heat', {user:req.session.user, heatPhotos: heatPhotos});
            } else {
                res.render('heat', {user:req.session.user});
            }
        });
    } else {
        res.redirect('/login');
    }
});

function filterLakers(photo){
    if(photo.team === "lakers"){
        return true;
    }
    return false;
}

app.get('/photo/lakers', (req, res) => {
    if(req.session.user){
        Photo.find((err, photos) => {
            if(photos.length){
                const lakersPhotos = photos.filter(filterLakers);
                res.render('lakers', {user:req.session.user, lakersPhotos: lakersPhotos});
            } else {
                res.render('lakers', {user:req.session.user});
            }
        });
    } else {
        res.redirect('/login');
    }
});
app.get('/photo/view', (req, res) => {
    if(req.session.user){
        Photo.find((err, photos) => {
            if(photos.length){
                res.render('index', {user:req.session.user, photos: photos});
            } else {
                res.render('index', {user: req.session.user});
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/video/view', (req, res) => {
    if(req.session.user){
        Video.find((err, videos) => {
            if(videos.length){
                res.render('index2', {user:req.session.user, videos: videos});
            } else {
                res.render('index2', {user: req.session.user});
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/video/add', (req, res) => {
    if(req.session.user){
        res.render('video-add');
    } else {
        res.redirect('/login');
    }
});

app.post('/video/add', (req, res) => {
    new Video({
        publisher: req.body.publisher,
        url: req.body.url,
        team: req.body.team,
        description: req.body.description
    }).save(function(err) {
        if(err){
            res.render('video-add');
        } else {
            res.redirect('/video/view');
        }
    })
});

app.get('/photo/add', (req, res) => {
    if(req.session.user){
        res.render('photo-add');
    } else {
        res.redirect('/login');
    }
});

app.post('/photo/add', (req, res) => {
    new Photo({
        publisher: req.body.publisher,
        url: req.body.url,
        team: req.body.team,
        description: req.body.description
    }).save(function(err) {
        if(err){
            res.render('photo-add');
        } else {
            res.redirect('/photo/view');
        }
    });
});

app.get('/stats', (req, res) => {
    if(req.session.user){
        res.render('stats');
    } else {
        res.redirect('/login');
    }
});

app.post('/stats', (req, res) => {
    if(req.session.user){
        if(req.body.selectpicker === "n2018"){
            const lebron = NBA.findPlayer('lebron james');
            let stats = function(player) {
                return NBA.stats.playerInfo({ PlayerID: player.playerId });
            }
            let ans = stats(lebron);
            ans.then(function(ress) {
                const str = "hello";
                const yearPrint = 2018;
                let tempOBJ = {};
                tempOBJ.pts = ress.playerHeadlineStats[0].pts;
                tempOBJ.reb = ress.playerHeadlineStats[0].reb;
                tempOBJ.ast = ress.playerHeadlineStats[0].ast;
                res.render('stats', {msg: str, tempOBJ: tempOBJ, yearPrint: yearPrint});
            })
        } else if(req.body.selectpicker && req.body.selectpicker !== "n2018"){
            const str = "hello";
            const lbjYear = req.body.selectpicker;
            //console.log(lbjYear);
            const yearPrint = lbjYear.substring(1, lbjYear.length);
            let tempOBJ = {};
            tempOBJ.pts = statsLBJOBJ[lbjYear].pts
            tempOBJ.reb = statsLBJOBJ[lbjYear].reb
            tempOBJ.ast = statsLBJOBJ[lbjYear].ast
            //console.log(statsLBJOBJ[lbjYear].pts);
            //console.log(statsLBJOBJ[lbjYear].reb);
            //console.log(statsLBJOBJ[lbjYear].ast);
            //console.log(tempOBJ);
            res.render('stats', {msg: str, tempOBJ: tempOBJ, yearPrint: yearPrint});
        } else {
            res.render('stats')
        }
    } else {
        res.redirect('/login');
    }
})

app.get('/photo/:slug', (req, res) => {
	Photo.findOne({slug: req.params.slug}, (err, photos) => {
		res.render('photo-details', {photos: photos});
	});
});
module.exports = {
    filterCavs: filterCavs,
    filterHeat: filterHeat,
    filterLakers: filterLakers
}

app.listen(process.env.PORT || 3000);
