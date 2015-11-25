var moment = require('moment-timezone');

module.exports = {
    processDelivery: function(time) {
        return time.subtract(this.getESTOffset(time), 'minutes');
    },
    prepareForDB: function(time) {
        return time.add(getESTOffset(), 'minutes').subtract(getLocalOffset(), 'minutes');
    },
    getESTOffset: function() {
        return moment.tz.zone('America/New_York').offset(new Date().getTime());
    },
    getLocalOffset: function() {
        return moment().utcOffset();
    },
    isDST: function() {
        if (this.getESTOffset() > 240) {
            return true;
        } else {
            return false;
        }
    }
}