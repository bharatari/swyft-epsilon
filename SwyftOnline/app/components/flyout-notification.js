import Ember from "ember";

export default Ember.Component.extend({
    display: true,
    tagName: 'li',
    classNames: ['flyout-notification'],
    classNameBindings: ['display:flyout-visible:flyout-invisible'],
    didInsertElement: function() {
        var self = this;
        setTimeout(function() {
            self.set('display', false);
        }, 8000);
    },
    actions: {
        close: function() {
            this.set('display', false);
        }
    }
});