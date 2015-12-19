'use strict';

var expect = require('chai').expect;
var DecimalTime = require('../src/decimaltime');

describe('the decimaltime base class', function () {

    it('returns the decimal time for a provided date', function () {
        var date = new Date('Sat Dec 19 2015 12:00:00.000 GMT+0000 (UTC)');
        var d = new DecimalTime(date);
        expect(d.fraction).to.eql(0.5);
    });

    it('returns the decimal time provided utc hours, minutes, seconds and milliseconds', function () {
        var d = new DecimalTime(12, 34, 56, 789);

        expect(d.getHours()).to.eql(5);
        expect(d.getMinutes()).to.eql(24);
        expect(d.getSeconds()).to.eql(26);
        expect(d.getMilliseconds()).to.eql(839);
    });

    it('returns the different parts of a date', function () {
        var date = new Date('Sat Dec 19 2015 12:34:56.789 GMT+0000 (UTC)');
        var d = new DecimalTime(date);

        expect(d.getHours()).to.eql(5);
        expect(d.getMinutes()).to.eql(24);
        expect(d.getSeconds()).to.eql(26);
        expect(d.getMilliseconds()).to.eql(839);
    });

    it('returns a full time string', function () {
        var date = new Date('Sat Dec 19 2015 12:34:56.789 GMT+0000 (UTC)');
        var d = new DecimalTime(date);

        expect(d.toFullString()).to.eql('5:24:26.839');
        expect(d.toString()).to.eql('5:24:26');
    });
});