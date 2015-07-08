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
    getTransactionMetadata: function(recordsPerPage, cb) {
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
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'date',
                editable: true,
                advancedField: true
            }
        ];
        UserTransaction.find().exec(function(err, transactions) {
            cb({
                total: transactions.length,
                totalPages: Math.ceil(transactions.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                sortTypes: self.sortTypes
            });
        });
    },
    getGlobalMetadata: function(recordsPerPage, cb) {
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
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'date',
                editable: true,
                advancedField: true
            }
        ];
        Global.find().exec(function(err, globals) {
            cb({
                total: globals.length,
                totalPages: Math.ceil(globals.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                sortTypes: self.sortTypes
            });
        });
    },
    getUserMetadata: function(recordsPerPage, cb) {
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
                propertyName: 'isEnabled',
                displayName: 'Enabled',
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
                propertyName: 'createdAt',
                displayName: 'Created At',
                display: true,
                type: 'date',
                editable: true,
                advancedField: true
            }
        ];
        User.find().exec(function(err, users) {
            cb({
                total: users.length,
                totalPages: Math.ceil(users.length / recordsPerPage),
                sort: 'createdAt',
                sortType: 'DESC',
                properties: combined,
                sortTypes: self.sortTypes
            });
        });
    }
}   