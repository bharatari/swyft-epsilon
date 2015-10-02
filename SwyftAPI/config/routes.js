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
   
  //Authentication Routes
  'post /api/login':'AuthController.login',
  'post /api/logout':'AuthController.logout',
  'get /api/isAuthenticated':'AuthController.isAuthenticated',
  'get /api/isAdmin':'AuthController.isAdmin',
  'get /api/isDelivery':'AuthController.isDelivery',
  
  //Menu Routes
  'get /api/restaurants':'MenuController.restaurants',
  'get /api/restaurant/:restaurant_name':'MenuController.getRestaurant',
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
  'put /api/user/contactConsent':'UserController.setContactConsent',

  //Order Routes
  'get /api/orders':'OrderController.getOrders',
  'get /api/orders/all':'OrderController.getAllOrders',
  'get /api/order':'OrderController.getOrder',
  'get /api/deliveryOrders':'OrderController.getDeliveryOrders',
  'post /api/order':'OrderController.processOrder',
  'delete /api/order':'OrderController.deleteOrder',
  'get /api/orders/pending':'OrderController.pendingOrders',
  'get /api/orders/recent':'OrderController.recentOrders',
  'get /api/orders/adminRecent':'OrderController.getAdminRecentOrders',
    
  //Order Management Routes
  'get /api/orders/aggregate/:delivery_id':'OrderController.getAggregateOrders',
  'get /api/orders/master/:delivery_id':'OrderController.getMasterList',

  //Delivery Routes
  'get /api/deliveries':'DeliveryController.getOpenDeliveries',
  'post /api/delivery/complete':'DeliveryController.completeDelivery',
  'get /api/delivery/:delivery_id/orders':'DeliveryController.getDeliveryOrders',
  'get /api/adminDeliveries':'DeliveryController.getAdminDeliveries',
  'post /api/delivery':'DeliveryController.createDelivery',
  'post /api/delivery/close':'DeliveryController.closeDelivery',
  'post /api/delivery/offset':'DeliveryController.setDeliveryOffset',
  'post /api/delivery/deliveryStatus':'DeliveryController.setDeliveryStatus',
  'post /api/delivery/operationalStatus':'DeliveryController.setOperationalStatus',
  'get /api/delivery/status':'DeliveryController.getDeliveryLiveStatus',

  //Global Routes
  'get /api/news':'GlobalController.getNews',
  'post /api/news':'GlobalController.setNews',
  'get /api/faq':'GlobalController.getFAQ',
  'post /api/faq':'GlobalController.setFAQ',
  'get /api/terms':'GlobalController.getTerms',
  'post /api/terms':'GlobalController.setTerms',
    
  //Delivery Note Routes
  'get /api/deliveryNote/global':'DeliveryNoteController.getGlobalDeliveryNote',
  'post /api/deliveryNote/global':'DeliveryNoteController.setGlobalDeliveryNote',
  'post /api/deliveryNote/comment':'DeliveryNoteController.setDeliveryNoteComment',
  'post /api/deliveryNote/delivered':'DeliveryNoteController.setDelivered',

  //Coupon Routes
  'get /api/coupon/checkCoupon/:token':'CouponController.checkToken',
  'get /api/coupon/tokens':'CouponController.getOpenTokens',
  'post /api/coupon/token':'CouponController.createIndependentToken',
  'get /api/coupon/token/:token':'CouponController.getToken',
    
  //Delivery Location Routes
  'get /api/deliveryLocations':'DeliveryLocationController.getLocations',
  'get /api/deliveryLocations/simple':'DeliveryLocationController.getLocationsSimple',
  'post /api/deliveryLocations/orders':'DeliveryLocationController.getLocationOrders',
    
  //Analytics Routes
  'get /api/analytics/orders/chart':'AnalyticsController.getOrderChart',
  'get /api/analytics/deliveries/data':'AnalyticsController.getActiveDeliveryData',
  'get /api/analytics/dashboard/statistics':'AnalyticsController.getDashboardStats',
  'get /api/analytics/revenue/chart':'AnalyticsController.getRevenueChart',
    
  //Temporary Routes
  'get /csrfToken':'AuthController.csrfToken',
    
  //Admin Routes  
  'get /api/admin/userTransaction/metadata':'UserTransactionController.getTransactionMetadata',
  'get /api/admin/userTransaction/model':'UserTransactionController.getTransactionModel',
  'get /api/admin/userTransaction/:id':'UserTransactionController.findOne',
  'get /api/admin/user/metadata':'UserController.getUserMetadata',
  'get /api/admin/user/model':'UserController.getUserModel',
  'get /api/admin/user/:id':'UserController.findOne',
  'get /api/admin/global/metadata':'GlobalController.getGlobalMetadata',
  'get /api/admin/global/model':'GlobalController.getGlobalModel',
  'get /api/admin/coupon/metadata':'CouponController.getCouponMetadata',
  'get /api/admin/coupon/model':'CouponController.getCouponModel',
  'get /api/admin/token/metadata':'TokenController.getTokenMetadata',
  'get /api/admin/token/model':'TokenController.getTokenModel',
  'get /api/admin/delivery/metadata':'DeliveryController.getDeliveryMetadata',
  'get /api/admin/delivery/model':'DeliveryController.getDeliveryModel',
  'get /api/admin/deliveryLocation/metadata':'DeliveryLocationController.getDeliveryLocationMetadata',
  'get /api/admin/deliveryLocation/model':'DeliveryLocationController.getDeliveryLocationModel',
  'get /api/admin/restaurant/model':'RestaurantController.getRestaurantModel',
  'get /api/admin/restaurant/metadata':'RestaurantController.getRestaurantMetadata',
  'get /api/admin/menuItem/model':'MenuItemController.getMenuItemModel',
  'get /api/admin/menuItem/metadata':'MenuItemController.getMenuItemMetadata',
  'get /api/admin/order/model':'OrderController.getOrderModel',
  'get /api/admin/order/metadata':'OrderController.getOrderMetadata',
  'get /api/admin/order/:id':'OrderController.findOne',
  'get /api/admin/deliveryPeriod/model':'DeliveryPeriodController.getDeliveryPeriodModel',
  'get /api/admin/deliveryPeriod/metadata':'DeliveryPeriodController.getDeliveryPeriodMetadata',
  'get /api/admin/deliveryGroup/model':'DeliveryGroupController.getDeliveryGroupModel',
  'get /api/admin/deliveryGroup/metadata':'DeliveryGroupController.getDeliveryGroupMetadata',
  'get /api/admin/attachedRequest/model':'AttachedRequestController.getAttachedRequestModel',
  'get /api/admin/attachedRequest/metadata':'AttachedRequestController.getAttachedRequestMetadata',
 
  //Live Routes
  'get /api/admin/orders/watch':'OrderController.watch',
  'get /api/admin/notifications/subscribe':'NotificationController.subscribe',
    
  //Email Routes
  'post /api/email/join':'EmailController.sendJoinUsEmail'
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
