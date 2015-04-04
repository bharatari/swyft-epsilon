var math = require('mathjs');

module.exports = {
    add: function(value1, value2) {
        return math.chain(math.bignumber(value1)).add(math.bignumber(value2)).done();
    },
    subtract: function(value1, value2) {
        return math.chain(math.bignumber(value1)).subtract(math.bignumber(value2)).done();
    },
    multiply: function(value1, value2) {
        return math.chain(math.bignumber(value1)).multiply(math.bignumber(value2)).done();
    },
    divide: function(value1, value2) {
        return math.chain(math.bignumber(value1)).divide(math.bignumber(value2)).done();
    }
}