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
        restaurants:{
            type:'string'
        },
        //In the future, we will be able to create multiple deliveries for a delivery period
        mainDelivery:{
            type:'boolean'
        },
        orderCutoff:{
            type:'datetime'
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