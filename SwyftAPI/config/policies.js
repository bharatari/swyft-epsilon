/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {
  AuthController:{ },
  MenuController:{ },
  DeliveryController:{
    "getAdminDeliveries":['isAdmin', 'userDisabled'],
    "completeDelivery":['isAdmin', 'userDisabled'],
    "getDeliveryOrders":['isAdmin', 'userDisabled'],
    "closeDelivery":['isAdmin', 'userDisabled'],
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']  
  },
  OrderController:{
    "*":['isAuthenticated', 'userDisabled', 'suppressSystem'],
    "retrieveOrders":['isAdmin', 'userDisabled'],
    "deleteOrder":['isAdmin', 'userDisabled'],
    "addDeliveryPeriod":['isAdmin', 'userDisabled'],
    "createFulfillment":['isAdmin', 'userDisabled'],
    "getDeliveryOrders":['isDelivery', 'userDisabled'],
    "getAggregateOrders":[],
    "getAllOrders":['isAdmin', 'userDisabled'],
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']  
  },   
  UserController:{
    "getUser":['isAuthenticated', 'userDisabled'],
    "preliminaryBalanceRequest":['isAdmin', 'userDisabled'],
    "balanceRequest":['isAdmin', 'userDisabled'],
    "getUsers":['isAdmin', 'userDisabled'],
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "setContactConsent":['isAuthenticated', 'userDisabled'],
    // In this case, create should be public (sign up)
    /* "create":['isAdmin' , 'removeAdminParams', 'userDisabled'], */
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']
  },
  ViewController:{
    "*":true
  },
  UserTransactionController:{
    "*":['isAdmin', 'userDisabled'],
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']
  },
  DeliveryNoteController:{
    "*":['isDelivery', 'userDisabled']
  },
  CouponController:{
    "*":['isAdmin', 'userDisabled'],
    "checkToken":[],
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled'] 
  },
  GlobalController:{
    "setNews":['isAdmin', 'userDisabled'],
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']  
  },
  TokenController:{
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']  
  },
  DeliveryLocationController:{
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']  
  },
  RestaurantController:{
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']  
  },
  AnalyticsController:{
    "*":['isAdmin', 'userDisabled']
  },
  MenuItemController:{
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled']  
  },
  DeliveryPeriodController:{
    "find":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "findOne":['isAdmin', 'userDisabled'],
    "create":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "update":['isAdmin', 'removeAdminParams', 'userDisabled'],
    "destroy":['isAdmin', 'userDisabled'],
    "populate":['isAdmin', 'userDisabled'],
    "add":['isAdmin', 'userDisabled'],
    "remove":['isAdmin', 'userDisabled'] 
  }
  
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
