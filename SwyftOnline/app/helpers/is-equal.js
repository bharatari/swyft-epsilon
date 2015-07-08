import Ember from "ember";

export default Ember.Helper.helper(function([lhs, rhs, valuePath]) {
    if(valuePath) {
        return lhs[valuePath] === rhs;
    }
    else {
        return lhs === rhs;
    }
});

