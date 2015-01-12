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
        restaurants: {
            type:'string'
        },
        enabled: {
            type:'boolean',
            defaultsTo:true
        }
    },
}