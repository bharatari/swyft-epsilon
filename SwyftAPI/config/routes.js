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

  //SwyftOnline View Routes
  '/':'ViewController.homepage',
  '/app/*':'ViewController.homepage',
  '/admin':'ViewController.homepage',
  '/admin/*':'ViewController.homepage',
  '/delivery':'ViewController.homepage',
  '/delivery/*':'ViewController.homepage',
  '/system/*':'ViewController.homepage',    
   
  //API Routes
  'post /api/login':'AuthController.login',
  'post /api/logout':'AuthController.logout',
  'get /api/isAuthenticated':'AuthController.isAuthenticated',
  'get /api/isAdmin':'AuthController.isAdmin',
  'get /api/isDelivery':'AuthController.isDelivery',
  
  //RESTful Routes
  'get /api/restaurants':'MenuController.restaurants',
  'get /api/menuItems/:restaurant_name':'MenuController.menuItems',
  'get /api/item/:item_id':'MenuController.item',
  
   //User Routes
  'post /api/user':'UserController.create',
  'post /api/user/balance/preliminary':'UserController.preliminaryBalanceRequest',
  'post /api/user/balance':'UserController.balanceRequest',
  'get /api/user':'UserController.getUser',
  'get /api/users':'UserController.getUsers',
  'post /api/user/verification/verify':'UserController.verify',
  'post /api/user/verification/resend':'UserController.resend',
  'post /api/user/forgotPassword':'UserController.forgotPasswordToken',
  'post /api/user/password':'UserController.resetPassword',
  'get /api/user/forgotPassword/verify/:token':'UserController.validForgotPasswordToken',

  //Order Routes
  'get /api/orders':'OrderController.getOrders',
  'get /api/order':'OrderController.getOrder',
  'get /api/deliveryOrders':'OrderController.getDeliveryOrders',
  'post /api/order':'OrderController.processOrder',
  'delete /api/order':'OrderController.deleteOrder',
  'get /api/orders/pending':'OrderController.pendingOrders',
  'get /api/orders/recent':'OrderController.recentOrders',
  'get /api/orders/aggregate':'OrderController.getAggregateOrders',

  //Delivery Routes
  'get /api/deliveries':'DeliveryController.getOpenDeliveries',
  'post /api/delivery/complete':'DeliveryController.completeDelivery',
  'get /api/delivery/:delivery_id/orders':'DeliveryController.getDeliveryOrders',
  'get /api/adminDeliveries':'DeliveryController.getAdminDeliveries',
  'post /api/delivery':'DeliveryController.createDelivery',
  'post /api/delivery/close':'DeliveryController.closeDelivery',

  //Global Routes
  'get /api/news':'GlobalController.getNews',
  'post /api/news':'GlobalController.setNews',
  
  //Transaction Routes  
  'get /api/transactions':'TransactionController.getTransactions',
    
  //Delivery Note Routes
  'get /api/deliveryNote/global':'DeliveryNoteController.getGlobalDeliveryNote',
  'post /api/deliveryNote/global':'DeliveryNoteController.setGlobalDeliveryNote',

  //Temporary Routes
  'get /csrfToken':'AuthController.csrfToken'
    
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
