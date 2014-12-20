/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/':'ViewController.publicAccess',
  '/app/signup': 'ViewController.unauthenticated',
  '/app/login':'ViewController.unauthenticated',
  '/app/forgotPassword':'ViewController.unauthenticated',
  '/app/:restaurant/item/*':'ViewController.userAccess',
  '/app/:restaurant/*':'ViewController.userAccess',
  '/app/checkout':'ViewController.userAccess',
  '/app/profile':'ViewController.userAccess',  
  '/admin':'ViewController.adminAccess',
  '/admin/*':'ViewController.adminAccess',
  '/delivery':'ViewController.delivererAccess',
  '/delivery/order/*':'ViewController.delivererAccess',
  '/app/verify':'ViewController.verify',
  '/forgotPassword/:id':'ViewController.forgotPassword',
  '/app/resetPassword/*':'UserController.resetPassword',
    
    //TEMP Routes
  '/app/restaurants':'ViewController.publicAccess',
   
    //API Routes
    
  'get /api/restaurants':'MenuController.restaurants',
  'get /api/menuItems/:restaurant_name':'MenuController.menuItems',
    //OLD Routes    
  'post /api/login':'AuthController.login',
  'post /api/logout':'AuthController.logout', 
  'get /api/isAuthenticated':'AuthController.isAuthenticated',
  'get /api/user':'UserController.profile',
  'post /api/processOrder':'OrderController.processOrder',
  'get /api/deliveryPeriods':'OrderController.deliveryPeriods',
  'get /api/adminDeliveryPeriods':'OrderController.adminDeliveryPeriods',
  'post /api/orders':'OrderController.retrieveOrders',
  'post /api/deleteOrder':'OrderController.deleteOrder',
  'get /api/pendingOrders':'OrderController.pendingOrders',
  'get /api/recentOrders':'OrderController.recentOrders',
  'post /api/addDeliveryPeriod':'OrderController.addDeliveryPeriod',
  'get /api/resendEmail':'UserController.resend',
  'post /api/createUser':'UserController.create',
  'post /api/verifyUser':'UserController.verify',
  'post /api/createFulFillment':'OrderController.createFulfillment',
  'get /api/fulfillments':'OrderController.getFulfillments',
  'post /api/completeFulfillment':'OrderController.completeFulfillment',
  'post /api/createForgotPasswordToken':'UserController.createForgotPasswordToken',
  'post /api/resetPassword':'UserController.resetPassword',
  'post /api/closeDeliveryPeriod':'OrderController.closeDeliveryPeriod'
   
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
