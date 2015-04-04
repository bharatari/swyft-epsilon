import config from 'swyft-online/config/environment';

export default {
    processItem: function(data) {
        var options = [];
        var extras = [];
        var attachedRequests = [];
        var cartData = {
            name: data.name,
            id: data.id,
            quantity: 1,
            restaurant: data.restaurant,
            standardOptions: [],
            additionalRequests: data.additionalRequests
        }

        if(data.itemOptions) {
            for(var i = 0; i < data.itemOptions.length; i++) {
                options.push(data.itemOptions[i].value);
            }
        }

        if(data.extras) {
            for(var i = 0; i < data.extras.length; i++) {
                if(data.extras[i].isSelected === true) {
                    extras.push(data.extras[i]);
                }
            }
        }

        if(data.standardOptions) {
            for(var i = 0; i < data.standardOptions.length; i++) {
                if(data.standardOptions[i].isSelected === true) {
                    cartData.standardOptions.push(data.standardOptions[i]);
                }
            }
        }
        
        if(data.attachedRequests) {
            attachedRequests = this.processAttachedProperty(data);
        }
        
        cartData.options = options;
        cartData.extras = extras;
        cartData.attachedRequests = attachedRequests;

        cartData.price = data.baseprice;
        for (var property in cartData.options) {
            if (cartData.options.hasOwnProperty(property)) {
                if(cartData.options[property].price){
                    cartData.price+=cartData.options[property].price;
                }
            }
        }
        if(cartData.extras){
            for (var property in cartData.extras) {
                if (cartData.extras.hasOwnProperty(property)) {
                    if(cartData.extras[property] && cartData.extras[property].price){
                        cartData.price+=cartData.extras[property].price;
                    }
                }
            }
        }
        return cartData;
    },
    processItemView: function(data) {
        if(data.itemOptions){
            for(var i = 0; i < data.itemOptions.length; i++){
                if(data.itemOptions[i].name !== "Options"){
                    data.itemOptions[i].value = "";
                }
            }
        }
        if(data.itemOptions){
            for(var i = 0; i < data.itemOptions.length; i++){
                if(data.itemOptions[i].name !== "Options"){
                    for(var e = 0; e < data.itemOptions[i].options.length; e++) {
                        data.itemOptions[i].options[e].category = data.itemOptions[i].name;
                    }
                }
            }
        }
        var standardOptionsIndex = -1;
        if(data.itemOptions){
            for(var i = 0; i < data.itemOptions.length; i++){
                if(data.itemOptions[i].name === "Options"){
                    data.standardOptions = splitArray(data.itemOptions[i].options, data.itemOptions[i].default);
                    standardOptionsIndex = i;
                }
            }
        }
        if (standardOptionsIndex > -1) {
            data.itemOptions.splice(standardOptionsIndex, 1);
        }
        if(data.extras){
            data.extras = setUp(data.extras);
        }
        function splitArray(csv, bool){
            if(csv.length>0){
                var array=csv.split(", ");
                var objectArray=new Array();
                for(var i=0; i<array.length;i++){
                    var obj;
                    if(bool){
                        obj ={
                            name:"No " + array[i],
                            isSelected:false
                        }
                    }
                    else {
                        obj ={
                            name:array[i],
                            isSelected:false
                        }
                    }
                    objectArray.push(obj);
                }
                return objectArray;
            }
            else{
                return null;
            }
        }
        function setUp(extras){
            for(var i = 0; i < extras.length; i++){
                extras[i].isSelected=false;
            }
            return extras;
        }
        return data;
    },
    validate: function(data) {
        if(data.itemOptions){
            for(var i = 0; i < data.itemOptions.length; i++){
                if(data.itemOptions[i].value === ""){
                    return false;
                }
            }
        }
        if(this.verifyAttachedProperty(data) === false) {
            return false;
        }
        else {
            return true;
        }
    },
    getCategories: function(items) {
        var categories = [];
        for(var i = 0; i < items.length; i++) {
            var result = $.grep(categories, function(element, index) {
                return element.name === items[i].category;
            });
            if(result.length < 1) {
                categories.push({name: items[i].category});
            }
        }
        return categories;
    },
    sortCategories: function(categories, items) {
        for(var i = 0; i < categories.length; i++) {
            categories[i].items = [];
            for(var e = 0; e < items.length; e++) {
                if(items[e].category === categories[i].name) {
                    categories[i].items.push(items[e]);
                }
            }
        }
        return categories;
    },
    checkAttachedProperty: function(attachedRequest, item) {
        for(var e = 0; e < item.itemOptions.length; e++) {
            if(item.itemOptions[e].name === attachedRequest.watches) {
                if(attachedRequest.available === "onTrue") {
                    if(item.itemOptions[e].value.name === attachedRequest.on) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if(attachedRequest.available === "onFalse") {
                    if(item.itemOptions[e].value.name !== attachedRequest.on) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    },
    verifyAttachedProperty: function(item) {
        if(item.attachedRequests) {
            for(var i = 0; i < item.attachedRequests.length; i++) {
                for(var e = 0; e < item.itemOptions.length; e++) {
                    if(item.itemOptions[e].name === item.attachedRequests[i].watches) {
                        if(item.attachedRequests[i].available === "onTrue") {
                            if(item.itemOptions[e].value.name === item.attachedRequests[i].on) {
                                if(!item.attachedRequests[i].value || item.attachedRequests[i].value === "") {
                                    return false;
                                }
                            }
                        }
                        else if(item.attachedRequests[i].available === "onFalse") {
                            if(item.itemOptions[e].value.name !== item.attachedRequests[i].on) {
                                if(!item.attachedRequests[i].value || item.attachedRequests[i].value === "") {
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            return true;
        }
    },
    processAttachedProperty: function(item) {
        var attachedRequests = [];
        if(item.attachedRequests) {
            for(var i = 0; i < item.attachedRequests.length; i++) {
                for(var e = 0; e < item.itemOptions.length; e++) {
                    if(item.itemOptions[e].name === item.attachedRequests[i].watches) {
                        if(item.attachedRequests[i].available === "onTrue") {
                            if(item.itemOptions[e].value.name === item.attachedRequests[i].on) {
                                attachedRequests.push(item.attachedRequests[i].value);
                            }
                        }
                        else if(item.attachedRequests[i].available === "onFalse") {
                            if(item.itemOptions[e].value.name !== item.attachedRequests[i].on) {
                                attachedRequests.push(item.attachedRequests[i].value);
                            }
                        }
                    }
                }
            }
        }
        return attachedRequests;
    },
    processItems: function(items) {
        for(var e = 0; e < items.length; e++) {
            var options = "";
            for (var property in items[e].options) {
                if (items[e].options.hasOwnProperty(property)) {
                    options += items[e].options[property].name + ", ";
                }
            }
            if(items[e].standardOptions) {
                for(var z = 0; z < items[e].standardOptions.length; z++) {
                    if(items[e].standardOptions[z].isSelected) {
                        options += items[e].standardOptions[z].name + ", ";
                    }
                }
            }
            if(items[e].extras) {
                for(var property in items[e].extras) {
                    if(items[e].extras.hasOwnProperty(property)) {
                        options += items[e].extras[property].name + ", ";
                    }
                }
            }
            if(items[e].attachedRequests) {
                for(var i = 0; i < items[e].attachedRequests.length; i++) {
                    options += items[e].attachedRequests[i].name + ", ";
                }                   
            }
            options = options.substring(0, options.length - 2);
            items[e].itemOptions = options;
        }
        return items;
    }
}