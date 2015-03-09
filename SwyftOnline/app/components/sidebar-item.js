import Ember from "ember";

export default Ember.Component.extend({
    actions: {
        removeItem: function() {
            this.sendAction('removeItem', this.get('item'));
        },
        increaseQuantity: function() {
            this.sendAction('increaseQuantity', this.get('item'));
        },
        decreaseQuantity: function() {
            this.sendAction('decreaseQuantity', this.get('item'));
        }
    }
});