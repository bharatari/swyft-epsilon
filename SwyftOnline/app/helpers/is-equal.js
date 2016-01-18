import Ember from 'ember';

export default Ember.Helper.helper(([lhs, rhs, valuePath]) => {
  if (valuePath) {
    return lhs[valuePath] === rhs;
  }
  return lhs === rhs;
});
