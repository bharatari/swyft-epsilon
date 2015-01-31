var bcrypt =require('bcrypt');

module.exports={
    tableName:'users',
    attributes:{
        username:{
            type:'string',
            required:true,
            unique:true
        },
        password:{
            type:'string',
            required:true
        },
        firstName:{
            type:'string'
        },
        lastName:{
            type:'string'
        },
        dormitory:{
            type:'string'
        },
        postOfficeBox:{
            type:'string'
        },
        phoneNumber:{
            type:'string'
        },
        verified:{
            type:'boolean',
            defaultsTo:false
        },
        token:{
            type:'string'
        },
        balance:{
            type:'float'
        },
        contactConsent:{
            type:'boolean'
        },
        isAdmin:{
            type:'boolean',
            defaultsTo:false
        },
        isDriver:{
            type:'boolean',
            defaultsTo:false
        },
        isEmployee:{
            type:'boolean',
            defaultsTo:false
        },
        isDeliverer:{
            type:'boolean',
            defaultsTo:false
        },
        isEnabled:{
            type:'boolean',
            defaultsTo:true
        },
        testUser:{
            type:'boolean',
            defaultsTo:false
        }
    },
    
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.token;
      return obj;
    },
    
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                }
                else{
                    user.password = hash;
                    cb(null, user);
                }
            });
        });
    }
}