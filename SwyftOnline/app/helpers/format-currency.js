import Ember from 'ember';

export default Ember.Helper.helper((params, args) => {
  const value = params[0];
  const sign = (args.sign) ? args.sign : '$';
  const simple = (args.simple) ? args.simple : false;

  if (value === 0) {
    if (simple) {
      return 'FREE';
    }
    return sign + '0.00';
  }
  if (typeof value === 'number') {
    return sign + params[0].toFixed(2);
  } else if (parseFloat(value)) {
    return sign + parseFloat(value).toFixed(2);
  }
  if (simple) {
    return 'FREE';
  }
  return sign + '0.00';
});
