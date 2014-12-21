import Ember from "ember";

export default Ember.Controller.extend({
    item: function(){
        var data = this.get('model')[0];
        if(data.itemoptions){
            for(var i = 0; i < data.itemoptions.length; i++){
                if(data.itemoptions[i].name === "Options"){
                    data.standardOptions = splitArray(data.itemoptions[i].options);
                    data.itemoptions[i]=null;
                }
            }
        }
        if(data.extras){
            data.extras = setUp(data.extras);
        }
        if(data.itemoptions){
            for(var i = 0; i < data.itemoptions.length; i++){
                if(data.itemoptions[i].name !== "Options"){
                    data.itemoptions[i].value = "";
                }
            }
        }
        function splitArray(csv){
            if(csv.length>0){
                var array=csv.split(", ");
                var objectArray=new Array();
                for(var i=0; i<array.length;i++){
                    //Add conditional to check for 'default' or other options
                    var obj ={
                        name:array[i],
                        isSelected:false
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
            for(var i=0; i < extras.length; i++){
                extras[i].isSelected=false;
            }
        }
        return data;
    }.property('model'),
    actions: {
        toggleSidebar: function() {
            $('#nav-menu').offcanvas('toggle');
        },
        addToCart: function() {
            var data = this.item;
            var cartData = {
                name: data.name,
                id: data.id,
                restaurant: data.restaurant
            }
            for(var i = 0; i < data.itemoptions.length; i++){
                
            }
        }
    }
});