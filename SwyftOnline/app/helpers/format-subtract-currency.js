import Ember from "ember";

export default Ember.Helper.helper(function(params, args) {
    let value;
    try {
        value = math.chain(math.bignumber(params[1])).subtract(math.bignumber(params[0])).done();
    }
    catch(e) {
        value = 0;
    }
    const sign = (args.sign) ? args.sign : '$';
    const simple = (args.simple) ? args.simple : false;
    
    if(value === 0) {
        if(simple) {
            return "FREE";
        }
        else {
            return sign + "0.00";
        }
    }
    else {
        return sign + value.toFixed(2);
    }
});

