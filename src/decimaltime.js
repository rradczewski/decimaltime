'use strict';

function DecimalTime(hours, minutes, seconds, milliseconds, timezoneOffset) {
    if(arguments.length === 0) {
        this.fraction = DecimalTime.utcFractionFromDate(new Date());
    } else if(hours.constructor === Date) {
        this.fraction = DecimalTime.utcFractionFromDate(hours);
    } else if(typeof hours.valueOf() === 'number' && arguments.length == 1) {
        this.fraction = hours;
    } else {
        this.fraction = DecimalTime.utcFractionFromTime(hours | 0, minutes | 0, seconds | 0, milliseconds | 0, timezoneOffset | 0);
    }
}

DecimalTime.prototype.withUTCOffset = function (timezoneInHours) {
    var fraction = (this.fraction + DecimalTime.utcFractionFromTime(timezoneInHours, 0, 0, 0, 0) + 1) % 1;
    return new DecimalTime(fraction);
}
DecimalTime.prototype.getHours = function () {
    return ((this.fraction * 10) | 0) % 10;
};

DecimalTime.prototype.getMinutes = function () {
    return ((this.fraction * 10 * 100) | 0) % 100;
};

DecimalTime.prototype.getSeconds = function () {
    return ((this.fraction * 10 * 100 * 100) | 0) % 100;
};

DecimalTime.prototype.getMilliseconds = function () {
    return ((this.fraction * 10 * 100 * 100 * 1000) | 0) % 1000;
};

DecimalTime.prototype.toFullString = function () {
    return this.toString() + '.'
        + padZeroes(this.getMilliseconds(), 3);
};

DecimalTime.prototype.toString = function () {
    return this.toShortString() + ':'
        + padZeroes(this.getSeconds(), 2);
};

DecimalTime.prototype.toShortString = function () {
    return this.getHours() + ':'
        + padZeroes(this.getMinutes(), 2);
};

function padZeroes(str, len) {
    var str = str.toString();
    while(str.length < len) {
        str  = '0' + str;
    }
    return str;
}

DecimalTime.utcFractionFromTime = function (hours, minutes, seconds, milliseconds, timezoneOffset) {
    return (hours*60*60*1000 +
        minutes*60*1000 +
        seconds*1000 +
        milliseconds +
        timezoneOffset * 60 * 1000) /
        (24*60*60*1000);
};

DecimalTime.utcFractionFromDate = function (date) {
    return DecimalTime.utcFractionFromTime(
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds(),
            0);
};

module.exports = DecimalTime;
