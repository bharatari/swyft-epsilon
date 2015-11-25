/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'swyft-epsilon-online',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  
  ENV.routeLocation = "http://localhost:1337";

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
      
    ENV.contentSecurityPolicy = {
        'default-src': "'none'",
        'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com  https://checkout.stripe.com http://localhost:1337",
        'font-src': "'self' http://fonts.gstatic.com https://fonts.gstatic.com https://code.ionicframework.com https://maxcdn.bootstrapcdn.com",
        'connect-src': "'self' http://localhost:1337 ws://localhost:1337",
        'img-src': "'self' https://swyftepsilon.blob.core.windows.net",
        'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://cdnjs.cloudflare.com https://code.ionicframework.com", 
        'media-src': "'self'"
    }
    ENV.routeLocation = "http://localhost:1337";
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.routeLocation = "";
  }   
    
  ENV.cartVersion = 2.0;

  ENV.stripe = {
    key: "pk_test_NWvAAITL9qMM7mUAjknRjeY1"
  }
  
  ENV.appVersion = "4.0.5";
  ENV.appVersionLabel = "4.0.5 LTS"
  ENV.appCodename= "Icy Mustard";
   
  return ENV;
};
