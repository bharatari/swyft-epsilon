/* jslint unused: false */
/* global _ */
import itemUtils from 'swyft-epsilon-online/utils/item-utils';
import config from 'swyft-epsilon-online/config/environment';

export default {
    cartKey: 'cart',
    cartVersionKey: 'cartVersion',
    /** This is used to find items **/
    cartItemsEqual: function(cartItem, arrayItem){
        if(cartItem.id === arrayItem.id && this.optionsEqual(cartItem.options, arrayItem.options) && this.standardOptionsEqual(cartItem.standardOptions, arrayItem.standardOptions) && this.extrasEqual(cartItem.extras, arrayItem.extras) && this.attachedRequestsEqual(cartItem, arrayItem) & (cartItem.additionalRequests === arrayItem.additionalRequests)) {
            return true;
        }
        else {
            return false;
        }
    },
    optionsEqual: function(cartItemOptions, arrayItemOptions){
        if(cartItemOptions.length === arrayItemOptions.length) {
            for(var i = 0; i < cartItemOptions.length; i++) {
                if(cartItemOptions[i].name === arrayItemOptions[i].name) { } 
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;   
        }
    },
    standardOptionsEqual: function(cartItemOptions, arrayItemOptions) {
        if(cartItemOptions.length === arrayItemOptions.length) {
            for(var i = 0; i < cartItemOptions.length; i++) {
                if(cartItemOptions[i].name === arrayItemOptions[i].name) { } 
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;   
        }
    },
    extrasEqual: function(cartItemExtras, arrayItemExtras) {
        if(cartItemExtras.length === arrayItemExtras.length) {
            for(var i = 0; i < cartItemExtras.length; i++) {
                if(cartItemExtras[i].name === arrayItemExtras[i].name) { } 
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;   
        }
    },
    attachedRequestsEqual: function(cartItem, arrayItem) {
        if(cartItem.attachedRequests && arrayItem.attachedRequests) {
            if(cartItem.attachedRequests.length === arrayItem.attachedRequests.length) {
                for(var i = 0; i < cartItem.attachedRequests.length; i++) {
                    if(cartItem.attachedRequests[i].name === arrayItem.attachedRequests[i].name) { } 
                    else {
                        return false;
                    }
                }
                return true;
            }
            else {
                return false;   
            }
        }
        else {
            return true;
        }
    },
    processCart: function(array) {
        if(!array) {
            return;
        }
        array = itemUtils.processItems(array);
        return array;
    },
    /** This check is used to combine duplicates **/
    checkDuplicates: function(item1, item2) {
        if(!item1 || !item2) {
            return false;
        }
        else if(item1 === item2) {
            return false;
        }
        else if((item1.id === item2.id) && _.isEqual(item1.standardOptions, item2.standardOptions) && _.isEqual(item1.options, item2.options) && _.isEqual(item1.extras, item2.extras) && (item1.additionalRequests === item2.additionalRequests) && _.isEqual(item1.attachedRequests, item2.attachedRequests)) {
            return true;
        }
        else {
            return false;
        }
    },
    combineItem: function(item1, item2) {
        if(!item1.quantity) {
            item1.quantity = 2;
        }
        else {
            item1.quantity++;
        }
        return item1;
    },
    addItem: function(item) {
        var processed = false;
        var array = JSON.parse(localStorage.getItem("cart"));
        for(var i = 0; i < array.length; i++) {
            if(this.checkDuplicates(item, array[i])){
                processed = true;
                array[i].quantity++;
            }
        }
        if(!processed) {
            array.push(item);
        }
        localStorage.setItem("cart", JSON.stringify(array));
    },
    getCartForRestore: function() {
        //This function is just about taking the existing state and restoring it
        //We don't have to worry about anything else
        if(typeof localStorage.getItem(this.cartKey) !== 'undefined') {
            return JSON.parse(localStorage.getItem(this.cartKey));
        }
        else {
            //If the cart doesn't exist, we can safely return an empty array with no side effects
            return [];
        }
    },
    getCartVersionForRestore: function() {
        //This will be falsy for 0, which makes sense because 0 is not a valid cartVersion
        if(typeof localStorage.getItem(this.cartVersionKey) !== 'undefined') {
            try {
                return JSON.parse(localStorage.getItem(this.cartVersionKey));
            }
            catch(err) {
                return localStorage.getItem(this.cartVersionKey);
            }
        }
        else {
            //What we return here is rather important, because it could cause side effects
            //If there is no cartVersion we can assume there is no cart either and therefore return the config cartVersion value
            return config.cartVersion;
        }
    },
    restoreCart: function(cart, cartVersion) {
        if(typeof cart !== 'undefined') {
            localStorage.setItem(this.cartKey, JSON.stringify(cart));
        }
        if(typeof cartVersion !== 'undefined') {
            localStorage.setItem(this.cartVersionKey, JSON.stringify(cartVersion));
        }
    }
};