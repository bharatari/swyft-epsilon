module.exports={
    tableName:'deliveries',
    attributes:{
        //Comma-separated
        deliverers:{
            type:'string'
        },
        comments:{
            type:'string'
        },
        deliveryDate:{
            type:'datetime'
        },
        deliveryPeriod:{
            type:'string'
        },
        /** FUTURE **/
        restaurants:{
            type:'string'
        },
        autoDelivery:{
            type:'boolean'
        },
        orderCutoff:{
            type:'datetime'
        },
        /** FUTURE **/
        fulfillment:{
            type:'array'
        },
        closed:{
            type:'boolean',
            defaultsTo: false
        },
        adminClosed:{
            type:'boolean',
            defaultsTo: false
        }
    },
}