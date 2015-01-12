import config from 'swyft-online/config/environment';

export default {
    processItem: function(data) {
        var options = [];
        var extras = [];
        var cartData = {
            name: data.name,
            id: data.id,
            restaurant: data.restaurant,
            standardOptions: []
        }

        if(data.itemOptions){
            for(var i = 0; i < data.itemOptions.length; i++){
                options.push(data.itemOptions[i].value);
            }
        }

        if(data.extras){
            for(var i = 0; i < data.extras.length; i++){
                if(data.extras[i].isSelected === true) {
                    extras.push(data.extras[i]);
                }
            }
        }

        if(data.standardOptions){
            for(var i = 0; i < data.standardOptions.length; i++){
                if(data.standardOptions[i].isSelected === true){
                    cartData.standardOptions.push(data.standardOptions[i]);
                }
            }
        }
        cartData.options = options;
        cartData.extras = extras;

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
            return true;
        }
        else {
            return true;
        }
    }
}