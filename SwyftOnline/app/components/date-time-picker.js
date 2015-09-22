/* global $ */
/* global moment */
import Ember from "ember";

export default Ember.Component.extend({
  	tagName: 'input',
    attributeBindings: ['id', 'required', 'value', 'disabled', 'name', 'autofocus', 'type', 'readonly'],
	type: 'text',
    action: Ember.K, // Ember.K is a placeholder for the passed in action function
                     // Action to fire on change
    
    didInitAttrs() {
        if(this.get('initialValue')) {
            this.set('value', moment(this.get('initialValue')).tz("America/New_York").format("MM-DD-YYYY hh:mm a Z"));
        }
    },
    didInsertElement() {
      this.on('change', function() {
        this.set('value', $("#" + this.elementId).val());
        this.processChange(this.get('value'));
      });  
    },
    processChange(value) {
        value = moment(value, "MM-DD-YYYY hh:mm a Z").toISOString();
        const changeCallback = this.get('action');
        changeCallback(value);  
    }
});