import Ember from "ember"
import config from 'swyft-epsilon-online/config/environment';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';

export default Ember.Controller.extend({ 
    filters: [],
    filtersChanged: function() {
        var filters = this.get('filters');
        var data = this.get('model');
        if(filters) {
            for(var i = 0; i < filters.length; i++) {
                data = this.filter(data, filters[i].filterProperty, filters[i].filterType, filters[i].filterValue);
            }
            this.set('data', data);
        }
        else {
            this.set('data', this.get('model'));
        }
    }.observes('filters'),
    filter: function(data, property, type, value) {
        //property = this.convertProperty(property);
        var newData = {
            items: []
        }
        if(parseFloat(value)) {
            value = parseFloat(value);
        }
        if(data) {
            for(var i = 0; i < data.items.length; i++) {
                if(type === "equalTo") {
                    if(typeof data.items[i][property] === 'string') {
                        if(data.items[i][property].toLowerCase() === value.toLowerCase()) {
                            newData.items.push(data.items[i]);
                        }
                    }
                    else {
                        if(data.items[i][property] === value) {
                            newData.items.push(data.items[i]);
                        }
                    }
                }
                else if(type === "notEqualTo") {
                    if(typeof data.items[i][property] === 'string') {
                        if(data.items[i][property].toLowerCase() !== value.toLowerCase()) {
                            newData.items.push(data.items[i]);
                        }
                    }
                    else {
                        if(data.items[i][property] !== value) {
                            newData.items.push(data.items[i]);
                        }
                    }
                }
                else if(type === "lessThan") {
                    if(data.items[i][property] < value) {
                        newData.items.push(data.items[i]);
                    }
                }
                else if(type === "greaterThan") {
                    if(data.items[i][property] > value) {
                        newData.items.push(data.items[i]);
                    }
                }
            }
        }
        return newData;
    }
});