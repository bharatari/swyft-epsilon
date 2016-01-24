import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['admin-sidebar-item'],
  classNameBindings: ['activeRoute:active', 'static:admin-sidebar-static'],
  attributeBindings: ['role'],
  role: 'presentation',
  activeRoute: Ember.computed('currentRoute', 'route', function () {
    if (this.get('currentRoute') === this.get('route')) {
      return true;
    }
    return false;
  }),
});
