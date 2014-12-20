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
            required:true,
            maxLength:20,
            min:6
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
      // Remove the password object value
      delete obj.password;
      // return the new object without password
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
    },
    
    beforeUpdate: function(user, cb){
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