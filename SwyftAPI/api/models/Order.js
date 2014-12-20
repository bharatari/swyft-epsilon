module.exports={
    tableName:'orders',
    attributes:{
        type:{
            type:'string',
            enum:["scheduled", "asap"]
        },
        items:{
            type:'array'
        },
        userId:{
            type:'string'   
        },
        userComments:{
            type:'string'
        },
        adminComments:{
            type:'string'
        },        
        totalAmount:{
            type:'float'
        },
        actualAmount:{
            type:'float'
        },
        paymentType:{
            type:'string',
            enum:["creditcard", "swyftdebit", "lioncard", "cash"]
        },
        isDelivered:{
            type:'boolean',
            defaultsTo:false
        },
        hasFulfillment:{
            type:'boolean',
            defaultsTo:false
        },
        fulfillmentId:{
            type:'string'
        },
        deliveryDate:{
            type:'datetime'
        },
        deliveryPeriod:{
            type:'string'
        },
        deliveryLocation:{
            type:'string'
        },
        contactPhone:{
            type:'string'
        },
        couponId:{
            type:'string'
        },
        tokenId:{
            type:'string'
        },
        //Normally simply delete orders, however, if the information must be kept, simply change this flag to true.
        isDeleted:{
            type:'boolean',
            defaultsTo:false
        }
    },
}