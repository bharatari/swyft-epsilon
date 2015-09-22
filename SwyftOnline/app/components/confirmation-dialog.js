/* global $ */
import Ember from "ember";

export default Ember.Component.extend({
    setup: function() {
        $('#' + this.elementId + ' .modal').modal({
            backdrop: 'static',
            keyboard: false,
            show: false
        });
    }.on('didInsertElement'),
    displayDialogChanged: function() {
        if(this.get('displayDialog')) {
            $('#' + this.elementId + ' .modal').modal('show');
        }
        else {
            $('#' + this.elementId + ' .modal').modal('hide');
        }
    }.observes('displayDialog'),
    actions: {
        cancel: function() {
            this.sendAction('cancel');
        },
        accept: function() {
            this.sendAction('accept');
        }
    }
});