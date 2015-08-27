import Ember from "ember";

export default Ember.Component.extend({
	booleanValues: [
        { propertyName: true, displayName: 'True' },
        { propertyName: false, displayName: 'False' }
    ],
	didInitAttrs() {
		var itemOptions = this.get('itemOptions');
		for(var i = 0; i < itemOptions.value.length; i++) {
			if(itemOptions.value[i].name === "Options") {
				this.set('standardOptionsExists', true);
			}
		}
	},
	name: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Name") {
				return properties[i];
			}
		}
	}),			
	baseprice: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Base Price") {
				return properties[i];
			}
		}
	}),
	category: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Category") {
				return properties[i];
			}
		}
	}),
	description: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Description") {
				return properties[i];
			}
		}
	}),
	adminComments: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Admin Comments") {
				return properties[i];
			}
		}
	}),
	restaurant: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Restaurant") {
				return properties[i];
			}
		}
	}),
	note: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Note") {
				return properties[i];
			}
		}
	}),
	attachedRequests: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Attached Requests") {
				return properties[i];
			}
		}
	}),
	unavailable: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Unavailable") {
				return properties[i];
			}
		}
	}),
	seasonal: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Seasonal") {
				return properties[i];
			}
		}
	}),
	temporary: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Temporary") {
				return properties[i];
			}
		}
	}),
	itemOptions: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Item Options") {
				return properties[i];
			}
		}
	}),
	extras: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].displayName === "Extras") {
				return properties[i];
			}
		}
	}),
	actions: {
		addItemOption: function() {
			var itemOptions = this.get('itemOptions');
			var value = itemOptions.value;
			var itemOption = {
				options: [
					{ name: "", price: null }
				],
				name: ""
			}
			value.push(itemOption);
			Ember.set(itemOptions, 'value', value);
			this.rerender();
		},
		deleteItemOption: function(itemOption) {
			var itemOptions = this.get('itemOptions');
            var value = itemOptions.value;
            Ember.set(itemOptions, 'value', _.remove(this.get('itemOptions').value, function(n) {
                return itemOption != n;
            }));
		},
		addExtra: function() {
			var extras = this.get('extras');
			var value = extras.value;
			var extra = {
				price: null,
				name: ""
			}
			value.push(extra);
			Ember.set(extras, 'value', value);
			this.rerender();
		},
		deleteExtra: function(extra) {
			var extras = this.get('extras');
            var value = extras.value;
            Ember.set(extras, 'value', _.remove(this.get('extras').value, function(n) {
                return extra != n;
            }));
		},
		removeStandardOptions: function() {
			var itemOptions = this.get('itemOptions');
			for(var i = 0; i < itemOptions.value.length; i++) {
				if(itemOptions.value[i].name === "Options") {
					Ember.set(itemOptions, 'value', _.remove(this.get('itemOptions').value, function(n) {
                		return itemOptions.value[i] != n;
            		}));
				}
			}
			this.set('standardOptionsExists', false)
		},
		addStandardOptions: function() {
			var itemOptions = this.get('itemOptions');
			var value = itemOptions.value;
			var itemOption = {
				options: "",
				default: false,
				name: "Options"
			}
			value.push(itemOption);
			Ember.set(itemOptions, 'value', value);
			this.rerender();
			this.set('standardOptionsExists', true);
		}
	}
});