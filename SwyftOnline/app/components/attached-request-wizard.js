import Ember from "ember";

export default Ember.Component.extend({
	booleanValues: [
        { propertyName: true, displayName: 'True' },
        { propertyName: false, displayName: 'False' }
    ],
	id: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "ID") {
				return properties[i];
			}
		}
	}),
	name: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Name") {
				return properties[i];
			}
		}
	}),			
	label: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Label") {
				return properties[i];
			}
		}
	}),
	options: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Options") {
				return properties[i];
			}
		}
	}),
	available: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Available") {
				return properties[i];
			}
		}
	}),
	watches: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Watches") {
				return properties[i];
			}
		}
	}),
	on: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "On") {
				return properties[i];
			}
		}
	}),
	required: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Required") {
				return properties[i];
			}
		}
	}),
	actions: {
		addOption: function() {
			var options = this.get('options');
			var value = options.value;
			var option = {
				price: null,
				name: ""
			}
			value.push(option);
			Ember.set(options, 'value', value);
			this.rerender();
		},
		deleteOption: function(option) {
			var options = this.get('options');
            var value = options.value;
            Ember.set(options, 'value', _.remove(this.get('options').value, function(n) {
                return option != n;
            }));
		}
	}
});