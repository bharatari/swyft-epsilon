import Ember from "ember";

export default Ember.Component.extend({  
    tagName: 'input',
    attributeBindings: ['name', 'type', 'checked', 'disabled'],
    type: 'radio',
    name: function() {
        return this.get('name');
    },
    checked: function () {
        return this.get('value') === this.get('selected');
    }.property('value', 'selected'),
    click: function () {
        this.set('selected', this.get('value'));
    }
});