module.exports={
    tableName:'deliveryPeriods',
    attributes:{
        dayOfWeek:{
            type:'string'
        },
        deliveryTime: {
            type:'datetime'
        },
        orderCutoff: {
            type:'datetime'
        },
        recurring: {
            type:'boolean'
        },
        disabledRestaurants: {
            type:'string'
        },
        //Only for non-recurring
        datetime: {
            type:'datetime'
        }
    },
}