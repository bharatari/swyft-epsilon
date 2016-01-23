/* global _ */
/* jslint unused: false */
/* jslint eqeqeq: true */
import Ember from 'ember';

export default Ember.Component.extend({
  booleanValues: [
    { propertyName: true, displayName: 'True' },
    { propertyName: false, displayName: 'False' },
  ],
  id: Ember.computed('properties', () => {
    const properties = this.get('properties');
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].displayName === 'ID') {
        return properties[i];
      }
    }
  }),
  name: Ember.computed('properties', () => {
    const properties = this.get('properties');
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].displayName === 'Name') {
        return properties[i];
      }
    }
  }),
  label: Ember.computed('properties', () => {
    const properties = this.get('properties');
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].displayName === 'Label') {
        return properties[i];
      }
    }
  }),
  options: Ember.computed('properties', () => {
    const properties = this.get('properties');
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].displayName === 'Options') {
        return properties[i];
      }
    }
  }),
  available: Ember.computed('properties', () => {
    const properties = this.get('properties');
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].displayName === 'Available') {
        return properties[i];
      }
    }
  }),
  watches: Ember.computed('properties', () => {
    const properties = this.get('properties');
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].displayName === 'Watches') {
        return properties[i];
      }
    }
  }),
  on: Ember.computed('properties', () => {
    const properties = this.get('properties');
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].displayName === 'On') {
        return properties[i];
      }
    }
  }),
  required: Ember.computed('properties', () => {
    const properties = this.get('properties');
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].displayName === 'Required') {
        return properties[i];
      }
    }
  }),
  actions: {
    addOption() {
      /* eslint-disable prefer-const */
      let options = this.get('options');
      let value = options.value;
      let option = {
        price: null,
        name: '',
      };
      /* eslint-enable prefer-const */
      value.push(option);
      Ember.set(options, 'value', value);
      this.rerender();
    },
    deleteOption(option) {
      let options = this.get('options'); // eslint-disable-line prefer-const
      Ember.set(options, 'value', _.remove(this.get('options').value, (n) => {
        return option !== n;
      }));
    },
  },
});
