import Ember from "ember";

export default Ember.Component.extend({
    didInsertElement() {
        $("#tree-" + this.elementId).jstree({ 'core' : {
			'data' : this.get('formattedJSON')
		}});
	},
	formattedJSON: Ember.computed('data', function() {
		var data = this.get('data');
		var root = {
			text: this.get('rootName'),
			children: []
		}
		root = this.populateJSON(data, root);
		return root;
	}),
	populateJSON(data, parent) {
		if(this.isArray(data)) {
			for(var i = 0; i < data.length; i++) {
				parent.children.push({ text: i.toString(), children: [] });
				parent.children[i] = this.populateJSON(data[i], parent.children[i]);
			}
		}
		else if(this.isObject(data)) {
			var index = 0;
			for(var property in data) {
				if(data.hasOwnProperty(property)) {
					parent.children.push({ text: property, children: [] });
					parent.children[index] = this.populateJSON(data[property], parent.children[index]);
					index++;
				}
			}
		}
		else {
			parent.children.push({ text: data });
		}
		return parent;
	},
	isArray(object) {
		if(Object.prototype.toString.call(object) === '[object Array]') {
			return true
		}
		else {
			return false
		}
	},
	isObject(object) {
		if(Object.prototype.toString.call(object) === '[object Object]') {
			return true
		}
		else {
			return false
		}
	},
	actions:{
		/* Change the original data, and just rerender */
		add() {
			var instance = $("#tree-" + this.elementId).jstree(true);
			var selectedObject = instance.get_selected(true);
			instance.create_node(selectedObject);
		},
		remove() {
			var instance = $("#tree-" + this.elementId).jstree(true);
			var selectedObject = instance.get_selected(true);
			instance.delete_node(selectedObject);
		},
		edit() {
			//don't allow editing of array numbers
		}
	}
});