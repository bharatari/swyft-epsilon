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
        disabledRestaurants: {
            type:'string'
        },
        enabled: {
            type:'boolean',
            defaultsTo:true
        }
    },
}