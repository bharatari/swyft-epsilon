import Ember from 'ember';

export default Ember.Helper.helper(([object, path]) => {
  return Ember.get(object, path);
});
