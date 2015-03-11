export default {
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
    processCart: function() {
        var array=JSON.parse(localStorage.getItem("cart"));
        for(var i = 0; i < array.length; i++){
            var options = "";
            for (var property in array[i].options) {
                if (array[i].options.hasOwnProperty(property)) {
                    options += array[i].options[property].name + ", ";
                }
            }
            for(var e = 0; e < array[i].standardOptions.length; e++) {
                if(array[i].standardOptions[e].isSelected){
                    options += array[i].standardOptions[e].name + ", ";
                }
            }
            for(var property in array[i].extras) {
                if(array[i].extras.hasOwnProperty(property)) {
                    options += array[i].extras[property].name + ", ";
                }
            }
            if(array[i].attachedRequests) {
                for(var e = 0; e < array[i].attachedRequests.length; e++) {
                    options += array[i].attachedRequests[e].name + ", ";
                }                   
            }
            options = options.substring(0, options.length-2);
            array[i].itemOptions=options;
        }
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
    }
}