const User = mongoose.model('User');

const statsLBJ = [

{"n2003": {"pts":20.9, "reb":5.5, "ast":5.9}},
{"n2004": {"pts":27.2, "reb":7.4, "ast":7.2}}, 
{"n2005": {"pts":31.4, "reb":7.0, "ast":6.6}},
{"n2006": {"pts":27.3, "reb":6.7, "ast":6.0}},
{"n2007": {"pts":30.0, "reb":7.9, "ast":7.2}},
{"n2008": {"pts":28.4, "reb":7.6, "ast":7.2}},
{"n2009": {"pts":29.7, "reb":7.3, "ast":8.6}},
{"n2010": {"pts":26.7, "reb":7.5, "ast":7.0}},
{"n2011": {"pts":27.1, "reb":7.9, "ast":6.2}},
{"n2012": {"pts":26.8, "reb":8.0, "ast":7.3}},
{"n2013": {"pts":27.1, "reb":6.9, "ast":6.3}},
{"n2014": {"pts":25.3, "reb":6.0, "ast":7.4}},
{"n2015": {"pts":25.3, "reb":7.4, "ast":6.8}},
{"n2016": {"pts":26.4, "reb":8.6, "ast":8.7}},
{"n2017": {"pts":27.5, "reb":8.6, "ast":9.1}},

];

// statsLBJ[0].n2003.pts

const lebron = NBA.findPlayer('lebron james');
console.log(lebron);
let stats = function(player) {
    return NBA.stats.playerInfo({ PlayerID: player.playerId });
}
let ans = stats(lebron);

ans.then(function(res) {
    console.log(res.playerHeadlineStats[0].pts);
    console.log(res.playerHeadlineStats);
})