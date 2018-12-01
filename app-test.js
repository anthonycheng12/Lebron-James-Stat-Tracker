const chai = require('chai');
const expect = chai.expect; 
const app = require('./app.js');

describe('app', function() {
    describe('filterCavs', function() {
        it('returns true for team with cavs', function() {
            const obj = {"photo1": {team: "cavs"}};
            const ans = app.filterCavs(obj.photo1);
            expect(ans).to.equal(true);
        });

        it('returns false for team without cavs', function() {
            const obj = {"photo1": {team: "lakers"}};
            const ans = app.filterCavs(obj.photo1);
            expect(ans).to.equal(false);
        })
    })

    describe('filterHeat', function() {
        it('returns true for team with heat', function() {
            const obj = {"photo1": {team: "heat"}};
            const ans = app.filterHeat(obj.photo1);
            expect(ans).to.equal(true);
        });

        it('returns false for team without heat', function() {
            const obj = {"photo1": {team: "lakers"}};
            const ans = app.filterHeat(obj.photo1);
            expect(ans).to.equal(false);
        })
    })

    describe('filterLakers', function() {
        it('returns true for team with lakers', function() {
            const obj = {"photo1": {team: "lakers"}};
            const ans = app.filterLakers(obj.photo1);
            expect(ans).to.equal(true);
        });

        it('returns false for team without lakers', function() {
            const obj = {"photo1": {team: "cavs"}};
            const ans = app.filterLakers(obj.photo1);
            expect(ans).to.equal(false);
        })
    })
});