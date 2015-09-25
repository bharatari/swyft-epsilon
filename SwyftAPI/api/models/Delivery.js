module.exports={
    tableName:'deliveries',
    attributes:{
        /*** @note - Should be comma-separated */
        deliverers:{
            type:'string'
        },
        comments:{
            type:'string'
        },
        deliveryDate:{
            type:'datetime'
        },
        estimatedDelivery:{
            type:'datetime'
        },
        scheduledArrival:{
            type:'datetime'
        },
        estimatedArrival:{
            type:'datetime'
        },
        deliveryPeriod:{
            type:'string'
        },
        /*** @future -  Accomodates ability for certain restaurants to be disabled for a delivery */
        restaurants:{
            type:'string'
        },
        autoDelivery:{
            type:'boolean'
        },
        orderCutoff:{
            type:'datetime'
        },
        /*** @future -  Accomodates ability for a delivery to split into multiple fulfillments */
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