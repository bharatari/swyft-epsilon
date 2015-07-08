import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'select',
    attributeBindings: ['id', 'required', 'disabled', 'name', 'autofocus'],
    content: [],
    prompt: null,
    optionValuePath: null,
    optionLabelPath: null,
    action: Ember.K, // Ember.K is a placeholder for the passed in action function
                     // Action to fire on change
            
    didInsertElement: function() {
        if(this.get('selection') === null || this.get('selection') === undefined) {
            if(!this.get('prompt')) {
                this.processSelection(this.get('content')[0]);
            }
        }    
        this.on('change', function() {
            const selectedIndex = $("#" + this.elementId)[0].selectedIndex;
            const content = this.get('content');

            // decrement index by 1 if we have a prompt
            const hasPrompt = !!this.get('prompt');
            const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

            this.processSelection(content[contentIndex]);
        });
    },
    processSelection(selection) {
        if(this.get('optionValuePath')) {
            selection = selection[this.get('optionValuePath')];
        }
        this.set('selection', selection);
        const changeCallback = this.get('action');
        changeCallback(selection);
    }
});