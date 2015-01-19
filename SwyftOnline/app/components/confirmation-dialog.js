import Ember from "ember";

export default Ember.Component.extend({
    displayDialogChanged: function() {
        if(this.get('displayDialog')) {
            $('.confirmation').modal('show');
        }
        else {
            $('.confirmation').modal('hide');
        }
    }.observes('displayDialog').on('didInsertElement'),
    actions: {
        cancel: function() {
            this.sendAction('cancel');
        },
        accept: function() {
            this.sendAction('accept');
        }
    }
});