import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import AdminPageMixin from 'swyft-online/mixins/admin-page';

export default Ember.Controller.extend(AdminPageMixin, { 
    modelName: 'User',
    description: 'Add, update, and edit Users.',
    currentRoute: 'admin-users',
    queryParams: ['page', 'sort', 'sortType', 'filters', 'filterArray'],
    page: 1,                                  
    sort: 'createdAt',
    sortType: 'DESC',
    filterArray: [],
    filtersChanged: function() {
        this.set('filters', JSON.stringify(this.convertFilters(this.get('filterArray'))));
    }.observes('filterArray'),
    actions: {
        delete: function(id) {
            this.set('dialogTitle', 'Confirmation');
            this.set('dialogBody', "You are attempting to permanently delete this user. This is a non-reversible action.");
            this.set('displayDialog', true);
            this.set('deleteId', id);
        },
        accept: function() {
            var self = this;
            if(this.get('deleteId')) {
                Ember.$.ajax({
                    url: config.routeLocation + "/api/admin/users/" + this.get('deleteId'),
                    type: "DELETE",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'User Deleted');
                        self.set('modalBody', 'This user has been successfully deleted.');
                        self.set('displayModal', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your request.');
                        self.set('displayModal', true);
                    }
                });
            }
        },
        cancel: function() {
            this.set('deleteId', 0);
            this.set('displayDialog', false);
        },
        goToNewTransaction: function() {
            this.transitionToRoute('admin-user', 0);
        },
        goToTransaction: function(id) {
            this.transitionToRoute('admin-user', id);
        }
    }
});