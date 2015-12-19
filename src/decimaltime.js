
function DecimalTime(hours, minutes, seconds, milliseconds, timezoneOffset) {
    if(hours.constructor === Date) {
        this.fraction = Date.utcFractionFromDate(hours);
    } else {
        this.fraction = Date.fromTime(hours | 0, minutes | 0, seconds | 0, milliseconds | 0, timezoneOffset | 0);
    }
}


DecimalTime.prototype.getHours = function () {
    return (this.fraction * 10) | 0;
}

DecimalTime.prototype.getMinutes = function () {
    return ((this.fraction * 10 * 100) | 0) % 100;
}

DecimalTime.prototype.getSeconds = function () {
    return ((this.fraction * 10 * 100 * 100) | 0) % 100;
}

DecimalTime.prototype.getMilliseconds = function () {
    return ((this.fraction * 10 * 100 * 100 * 1000) | 0) % 1000;
}

Date.fromTime = function (hours, minutes, seconds, milliseconds, timezoneOffset) {
    return (hours*60*60*1000 +
        minutes*60*1000 +
        seconds*1000 +
        milliseconds +
        timezoneOffset * 60 * 1000) /
        (24*60*60*1000);
}

Date.utcFractionFromDate = function (date) {
    return Date.fromTime(
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds(),
            0);
}

module.exports = DecimalTime;