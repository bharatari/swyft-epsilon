import Ember from "ember";

export default Ember.Component.extend({
    setup: function() {
        $('#' + this.elementId + ' .modal').modal({
            backdrop: 'static',
            keyboard: false,
            show: false
        });
    }.on('didInsertElement'),
    displayModalChanged: function() {
        if(this.get('displayModal')) {
            $('#' + this.elementId + ' .modal').modal('show');
        }
        else {
            $('#' + this.elementId + ' .modal').modal('hide');
        }
    }.observes('displayModal'),
    actions: {
        close: function() {
            this.set('displayModal', false);
        }
    }
});