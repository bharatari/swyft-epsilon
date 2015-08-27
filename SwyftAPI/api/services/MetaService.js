module.exports = {
    sortTypes: [
        {
            propertyName:'DESC',
            displayName:'Descending'
        },
        {
            propertyName:'ASC',
            displayName:'Ascending'
        }
    ],
    checkFilters: function(filters) {
        if(filters && (Object.getOwnPropertyNames(JSON.parse(filters)).length !== 0)) {
            return true;
        }
        else {
            return false;
        }
    },
    processFilters: function(filters) {
        if(this.checkFilters(filters)) {
            filters = JSON.parse(filters);
        }
        else { 
            filters = {};
        }
        return filters;
    },
    processFiltersTransactions: function(filters, items, cb) {
        if(this.checkFilters(filters)) {
            TransactionService.iterateJoinUsers(items, function(transactions) {
                var filter = UtilityService.convertFilterFromWaterline(filters);
                transactions = UtilityService.filterData(transactions, filter);
                cb(transactions);
            });
        }
        else { 
            cb(items);
        }
    },
    processFiltersOrders: function(filters, items, cb) {
        if(this.checkFilters(filters)) {
            OrderService.iterateJoinUsers(items, function(orders) {
                var filter = UtilityService.convertFilterFromWaterline(filters);
                orders = UtilityService.filterData(orders, filter);
                cb(orders);
            });
        }
        else { 
            cb(items);
        }
    },
    getTransactionMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            { 
                propertyName: 'userId',
                displayName: 'User ID',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'user.firstName',
                displayName: 'First Name',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'user.lastName',
                displayName: 'Last Name',
                display: true,
                type:'string',
                editable: false
            },
            {
                propertyName: 'type',
                displayName: 'Type',
                display: true,
                type:'enum',
                enum:[
                    { propertyName: 'deposit', displayName: 'Deposit' },
                    { propertyName: 'deduction', displayName: 'Deduction' }
                ],
                editable: true
            },
            {
                propertyName: 'amount',
                displayName: 'Amount',
                display: true,
                type:'number',
                editable: true
            },
            {
                propertyName: 'comments',
                displayName: 'Comments',
                display: true,
                type:'string',
                editable: true
            },
            {
                propertyName: 'orderId',
                displayName: 'Order ID',
                display: true,
                type:'string',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'transactionCreator',
                displayName: 'Admin ID',
                display: true,
                type:'string',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'finalBalance',
                displayName: 'Final Balance',
                display: true,
                type:'number',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        UserTransaction.find().exec(function(err, items) {
            self.processFiltersTransactions(filters, items, function(data) {
                cb({
                    total: data.length,
                    totalPages: Math.ceil(data.length / recordsPerPage),
                    sort: 'createdAt',
                    sortType: 'DESC',
                    properties: combined,
                    recordsPerPage: recordsPerPage,
                    sortTypes: self.sortTypes
                });
            });
        });
    },
    getGlobalMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'key',
                displayName: 'Key',
                display: true,
                type: 'string',
                editable: true
            },
            { 
                propertyName: 'value',
                displayName: 'Value',
                display: true,
                type: 'string',
                editable: true,
                largeField: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        Global.find(this.processFilters(filters)).exec(function(err, data) {
            cb({
                total: data.length,
                totalPages: Math.ceil(data.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                recordsPerPage: recordsPerPage,
                sortTypes: self.sortTypes
            });
        });
    },
    getTokenMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'token',
                displayName: 'Token',
                display: true,
                type: 'string',
                editable: true
            },
            { 
                propertyName: 'discount',
                displayName: 'Discount',
                display: true,
                type: 'number',
                editable: true
            },
            { 
                propertyName: 'comments',
                displayName: 'Comments',
                display: true,
                type: 'string',
                editable: true,
                largeField: true
            },
            { 
                propertyName: 'hasBeenUsed',
                displayName: 'Has Been Used',
                display: true,
                type: 'boolean',
                editable: true
            },
            { 
                propertyName: 'usedBy',
                displayName: 'Used By',
                display: true,
                type: 'string',
                editable: true
            },
            { 
                propertyName: 'orderId',
                displayName: 'Order ID',
                display: true,
                type: 'string',
                editable: true,
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        Token.find(this.processFilters(filters)).exec(function(err, data) {
            cb({
                total: data.length,
                totalPages: Math.ceil(data.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                recordsPerPage: recordsPerPage,
                sortTypes: self.sortTypes
            });
        });
    },
    getCouponMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'name',
                displayName: 'Name',
                display: true,
                type: 'string',
                editable: true
            },
            { 
                propertyName: 'comments',
                displayName: 'Comments',
                display: true,
                type: 'string',
                editable: true,
                largeField: true
            },
            {
                propertyName: 'isActive',
                displayName: 'Active',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'discount',
                displayName: 'Discount',
                display: true,
                type: 'number',
                editable: true
            },
            {
                propertyName: 'code',
                displayName: 'Coupon Code',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        Coupon.find(this.processFilters(filters)).exec(function(err, data) {
            cb({
                total: data.length,
                totalPages: Math.ceil(data.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                recordsPerPage: recordsPerPage,
                sortTypes: self.sortTypes
            });
        });
    },
    getUserMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'username',
                displayName: 'Username',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'firstName',
                displayName: 'First Name',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'lastName',
                displayName: 'Last Name',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'dormitory',
                displayName: 'Dormitory',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'postOfficeBox',
                displayName: 'PO Box',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'phoneNumber',
                displayName: 'Phone Number',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'verified',
                displayName: 'Verified',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'balance',
                displayName: 'Balance',
                display: true,
                type: 'number',
                editable: true
            },
            {
                propertyName: 'contactConsent',
                displayName: 'Contact Consent',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'isAdmin',
                displayName: 'Admin',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'isDriver',
                displayName: 'Driver',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'isEmployee',
                displayName: 'Employee',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'isDeliverer',
                displayName: 'Deliverer',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'disabled',
                displayName: 'Disabled',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'testUser',
                displayName: 'Test User',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        User.find(this.processFilters(filters)).exec(function(err, users) {
            cb({
                total: users.length,
                totalPages: Math.ceil(users.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                recordsPerPage: recordsPerPage,
                sortTypes: self.sortTypes
            });
        });
    },
    getDeliveryMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'deliverers',
                displayName: 'Deliverers',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'comments',
                displayName: 'Comments',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'deliveryDate',
                displayName: 'Delivery Date',
                display: true,
                type: 'datetime',
                editable: true
            },
            {
                propertyName: 'deliveryPeriod',
                displayName: 'Delivery Period',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'restaurants',
                displayName: 'Restaurants',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'autoDelivery',
                displayName: 'Auto Delivery',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'orderCutoff',
                displayName: 'Order Cutoff',
                display: true,
                type: 'datetime',
                editable: true
            },
            /*
            {
                propertyName: 'fulfillment',
                displayName: 'Fulfillment',
                display: false,
                type: 'array',
                editable: false
            },
            */
            {
                propertyName: 'closed',
                displayName: 'Closed',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'adminClosed',
                displayName: 'Admin Closed',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        Delivery.find(this.processFilters(filters)).exec(function(err, data) {
            cb({
                total: data.length,
                totalPages: Math.ceil(data.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                recordsPerPage: recordsPerPage,
                sortTypes: self.sortTypes
            });
        });
    },
    getDeliveryLocationMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'name',
                displayName: 'Name',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'group',
                displayName: 'Group',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'latitude',
                displayName: 'Latitude',
                display: false,
                type: 'number',
                editable: false
            },
            {
                propertyName: 'longitude',
                displayName: 'Longitude',
                display: false,
                type: 'number',
                editable: false
            },
            {
                propertyName: 'disabled',
                displayName: 'Disabled',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        DeliveryLocation.find(this.processFilters(filters)).exec(function(err, data) {
            cb({
                total: data.length,
                totalPages: Math.ceil(data.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                recordsPerPage: recordsPerPage,
                sortTypes: self.sortTypes
            });
        });
    },
    getRestaurantMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'name',
                displayName: 'Name',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'title',
                displayName: 'Title',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'unavailable',
                displayName: 'Unavailable',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'aggregateStyle',
                displayName: 'Aggregate Style',
                display: true,
                type: 'enum',
                enum: [
                    { propertyName:'full', displayName:'Full' },
                    { propertyName:'simple', displayName:'Simple' }
                ],
                editable: true
            },
            {
                propertyName: 'notice',
                displayName: 'Notice',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'image',
                displayName: 'Image',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'subtitle',
                displayName: 'Subtitle',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        Restaurant.find(this.processFilters(filters)).exec(function(err, data) {
            cb({
                total: data.length,
                totalPages: Math.ceil(data.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                recordsPerPage: recordsPerPage,
                sortTypes: self.sortTypes
            });
        });
    },
    getMenuItemMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'name',
                displayName: 'Name',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'baseprice',
                displayName: 'Base Price',
                display: true,
                type: 'number',
                editable: true
            },
            {
                propertyName: 'category',
                displayName: 'Category',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'description',
                displayName: 'Description',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'itemOptions',
                displayName: 'Item Options',
                display: false,
                type: 'array',
                editable: true
            },
            {
                propertyName: 'extras',
                displayName: 'Extras',
                display: false,
                type: 'array',
                editable: true
            },
            {
                propertyName: 'attachedRequests',
                displayName: 'Attached Requests',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'unavailable',
                displayName: 'Unavailable',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'restaurant',
                displayName: 'Restaurant',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'adminComments',
                displayName: 'Admin Comments',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'note',
                displayName: 'Note',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'seasonal',
                displayName: 'Seasonal',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'temporary',
                displayName: 'Temporary',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        MenuItem.find(this.processFilters(filters)).exec(function(err, data) {
            cb({
                total: data.length,
                totalPages: Math.ceil(data.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                recordsPerPage: recordsPerPage,
                sortTypes: self.sortTypes
            });
        });
    },
    getOrderMetadata: function(recordsPerPage, filters, cb) {
        var self = this;
        var combined = [
            {
                propertyName: 'id',
                displayName: 'ID',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'user.firstName',
                displayName: 'First Name',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'user.lastName',
                displayName: 'Last Name',
                display: true,
                type: 'string',
                editable: false
            },
            {
                propertyName: 'type',
                displayName: 'Type',
                display: true,
                type: 'enum',
                enum: [
                    { propertyName:'scheduled', displayName:'Scheduled' },
                    { propertyName:'asap', displayName:'ASAP' }
                ],
                editable: true
            },
            {
                propertyName: 'items',
                displayName: 'Items',
                display: false,
                type: 'array',
                editable: false
            },
            {
                propertyName: 'userId',
                displayName: 'User ID',
                display: true,
                type: 'string',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'contactPhone',
                displayName: 'Phone',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'userComments',
                displayName: 'User Comments',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'adminComments',
                displayName: 'Admin Comments',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'totalAmount',
                displayName: 'Total Amount',
                display: true,
                type: 'number',
                editable: true
            },
            {
                propertyName: 'actualAmount',
                displayName: 'Actual Amount',
                display: true,
                type: 'number',
                editable: true
            },
            {
                propertyName: 'paymentType',
                displayName: 'Payment Type',
                display: true,
                type: 'enum',
                enum: [
                    { propertyName:'creditcard', displayName:'Credit Card' },
                    { propertyName:'swyftdebit', displayName:'Swyft Debit' },
                    { propertyName:'cash', displayName:'Cash' },
                    { propertyName:'cash+swyftdebit', displayName:'Cash + Swyft Debit' }
                ],
                editable: true
            },
            {
                propertyName: 'deliveryTime',
                displayName: 'Delivery Time',
                display: true,
                type: 'datetime',
                editable: true
            },
            {
                propertyName: 'deliveryId',
                displayName: 'Delivery ID',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'deliveryLocation',
                displayName: 'Delivery Location',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'couponId',
                displayName: 'Coupon ID',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'tokenId',
                displayName: 'Token ID',
                display: true,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'deliveryNote.isDelivered',
                displayName: 'Is Delivered',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'deliveryNote.deliveredBy',
                displayName: 'Delivered By',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'deliveryNote.commentedBy',
                displayName: 'Commented By',
                display: false,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'deliveryNote.comments',
                displayName: 'Comments',
                display: false,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'deliveryNote.deliveredAt',
                displayName: 'Delivered At',
                display: false,
                type: 'datetime',
                editable: true
            },
            {
                propertyName: 'deliveryNote.cashPayment',
                displayName: 'Cash Payment',
                display: false,
                type: 'number',
                editable: true
            },
            {
                propertyName: 'deliveryNote.chargeLater',
                displayName: 'Charge Later',
                display: false,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'deliveryNote.creditCardCharged',
                displayName: 'Credit Card Charged',
                display: false,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'deliveryNote.creditCardMessage',
                displayName: 'Credit Card Message',
                display: false,
                type: 'string',
                editable: true
            },
            {
                propertyName: 'isDeleted',
                displayName: 'Is Deleted',
                display: true,
                type: 'boolean',
                editable: true
            },
            {
                propertyName: 'updatedAt',
                displayName: 'Updated At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            },
            {
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'datetime',
                editable: true,
                advancedField: true
            }
        ];
        Order.find().exec(function(err, items) {
            self.processFiltersOrders(filters, items, function(data) {
                cb({
                    total: data.length,
                    totalPages: Math.ceil(data.length / recordsPerPage),
                    sort: 'createdAt',
                    sortType: 'DESC',
                    properties: combined,
                    recordsPerPage: recordsPerPage,
                    sortTypes: self.sortTypes
                });
            });
        });
    }
}   