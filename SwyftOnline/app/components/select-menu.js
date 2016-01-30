/* global $ */
import Ember from 'ember';

export default Ember.Component.extend({
  content: [],
  prompt: null,
  optionValuePath: null,
  optionLabelPath: null,
  action: Ember.K, // Ember.K is a placeholder for the passed in action function
                   // Action to fire on change
          
  didInitAttrs() {
    if (this.get('selection') === null || this.get('selection') === undefined) {
      if (!this.get('prompt')) {
        this.processSelection(this.get('content')[0]);
      }
    }    
  },
  change() {
    const selectedIndex = $("#" + this.elementId).find('select')[0].selectedIndex;
    const content = this.get('content');

    // Decrement index by 1 if we have a prompt
    const hasPrompt = !!this.get('prompt');
    const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

    this.processSelection(content[contentIndex]);
  },
  processSelection(selection) {
    if (this.get('optionValuePath')) {
      selection = selection[this.get('optionValuePath')];
    }
    this.set('selection', selection);
    const changeCallback = this.get('action');
    changeCallback(selection);
  }
});
