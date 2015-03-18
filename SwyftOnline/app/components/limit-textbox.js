import Ember from "ember";

export default Ember.Component.extend({  
    valueChanged: function() {
        if(this.get('value') > this.get('max')) {
            this.set('value', this.get('max'));
        }
        else if(this.get('value') < this.get('min')) {
            this.set('value', this.get('min'));
        }
    }.observes('value')
});