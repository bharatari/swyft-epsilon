/* global $ */
import Ember from "ember";
import StandardActionsMixin from 'swyft-epsilon-online/mixins/standard-actions';

export default Ember.Controller.extend(StandardActionsMixin, {
    searchValue: "",
    searchVisible: false,
    /*** @note - Even if searchVisible is false, we can't assume the searchValue is not editable. We stil need to check for all cases. */
    searchValueChanged: function() {
        var value = this.get('searchValue');
        var visible = this.get('searchVisible')
        if(visible === true) {
            if(value === "") {
                $("#sorted-items").removeClass('div-invisible');
                $("#all-items").addClass('div-invisible');
            }
            else {
                $("#sorted-items").addClass('div-invisible');
                $("#all-items").removeClass('div-invisible');
            }
        }
        else {
            $("#sorted-items").removeClass('div-invisible');
            $("#all-items").addClass('div-invisible');
        }
    }.observes('searchValue'),
    filteredItems: function() {
        var value = this.get("searchValue");
        var data = this.get('menuItems');
        return data.filter(function(item) {
            return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    }.property('menuItems', 'searchValue'),
    actions:{
        transition: function(itemId) {
            this.transitionToRoute('item', itemId, {queryParams: {restaurantId: this.get('restaurant').id}});
        }
    }
});