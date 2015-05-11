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
  DeliveryController: {
    "getAdminDeliveries":['isAdmin', 'userDisabled'],
    "completeDelivery":['isAdmin', 'userDisabled'],
    "getDeliveryOrders":['isAdmin', 'userDisabled'],
    "closeDelivery":['isAdmin', 'userDisabled']
  },
  OrderController:{
    "*":['isAuthenticated', 'userDisabled', 'suppressSystem'],
    "retrieveOrders":['isAdmin', 'userDisabled'],
    "deleteOrder":['isAdmin', 'userDisabled'],
    "addDeliveryPeriod":['isAdmin', 'userDisabled'],
    "createFulfillment":['isAdmin', 'userDisabled'],
    "getDeliveryOrders":['isDelivery', 'userDisabled'],
    "getAggregateOrders":[]
  },   
  UserController:{
    "getUser":['isAuthenticated', 'userDisabled'],
    "preliminaryBalanceRequest":['isAdmin', 'userDisabled'],
    "balanceRequest":['isAdmin', 'userDisabled'],
    "getUsers":['isAdmin', 'userDisabled']
  },
  ViewController:{
    "*":true
  },
  TransactionsController:{
    "*":['isAdmin', 'userDisabled']
  },
  DeliveryNoteController:{
    "*":['isDelivery', 'userDisabled']
  },
  CouponController:{
    "*":['isAdmin', 'userDisabled'],
    "checkToken":[]
  },
  GlobalController:{
    "setNews":['isAdmin', 'userDisabled']
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
