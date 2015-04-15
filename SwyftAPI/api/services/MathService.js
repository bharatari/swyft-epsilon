var math = require('mathjs');

module.exports = {
    add: function(value1, value2) {
        return math.chain(this.number(value1)).add(this.number(value2)).done();
    },
    subtract: function(value1, value2) {
        return math.chain(this.number(value1)).subtract(this.number(value2)).done().toString();
    },
    multiply: function(value1, value2) {
        return math.chain(this.number(value1)).multiply(this.number(value2)).done();
    },
    divide: function(value1, value2) {
        return math.chain(this.number(value1)).divide(this.number(value2)).done();
    },
    round: function(value) {
        return Math.round(value * 100) / 100;
    },
    number: function(value) {
        return math.bignumber(this.round(value));
    }
}