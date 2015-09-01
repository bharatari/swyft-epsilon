# Swyft

SwyftAPI is a [Sails](http://sailsjs.org) application. Sails.js is a enterprise-grade Node.js framework designed for rapidly building client-agnostic backends. The SwyftAPI project solely contains server code, while the web client of Swyft is developed under a separate Ember.js-based SwyftOnline project.

# Development

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Sails.js](http://sailsjs.org/)
## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`

## Running / Development

* `sails lift`
* Visit your app at [http://localhost:4200](http://localhost:4200).`

### Features

## Automatic Delivery Service
From Version 3, Epsilon has had an Automatic Delivery Management feature that creates and closes deliveries automatically based on a predefined schedule. This predefined schedule is contained within the `deliveryPeriods` MongoDB collection. The resulting deliveries are contained within the `deliveries` collection. Automatically created deliveries have a `autoDelivery` attribute set to `true`, which flags the delivery for automatic closing. If one wants to create a delivery that is manually closed, simply set this property to `false`. If an automatically created delivery needs to be removed (in the case that operations are not running that specific day), simply deleting the delivery will cause the automatic service to create another delivery in it's place. The record in `deliveryPeriods` needs to be disabled, which will stop the system from automatically creating deliveries based on that schedule, and then the delivery itself in `deliveries` can be deleted. 

### Notes
The `/** HARDCODE **/` flag is used to label a function that does not work in a modular or data-agnostic fashion. 
The `/** FUTURE **/` flag is used to label properties or functions that exist to accomodate future expansion, but are not used currently.

### Limitations
The `user` property is used to manage admin authentication, and therefore it should not be used as a property on models or for any other purpose. On Admin CRUD, for models that have joined data there is a conflict as the `user` property is used to authenticate changes, and is also used to store joined user data. In this case, it's best to use the alternative admin authentication property `_user` and then use `user` for the joined data. Because `user` and `_user` are not properties on any model, they are always deleted on the server before requests are processed.

The `token` property should be used with caution. It is generally reserved for admin authentication on req.query.token and req.query.tokenId. For request bodies, the token is reserved on req.body.user.token. 

Internal Models defined in ModelService or model-utils (on the client) must follow strict guidelines regarding passed-in parameters. If a parameter is not passed in or if a parameter isn't being used at the time of instantiation, it's value should be falsey. For unused parameters simply pass in the value `null`.
  
### Deploying

SwyftAPI and SwyftOnline, the server-side and client-side implementations of Swyft's web infrastructure, respectively, are developed separately in order to promote modularity and stability. 

For production, however, the SwyftOnline project is hosted with this SwyftAPI server. If changes have been made to SwyftOnline, follow the steps listed in its deployment guide.

Ensure that all development environment settings, such as CORS have been switched off within SwyftAPI.

Once the proper SwyftOnline files have been setup and necessary changes haves been made to the server for productiojn, simply change to the SwyftAPI root folder in a Node.js console and `modulus deploy`. You may be asked to login to your Modulus.io account, and if you have multiple projects associated with your account, you will be asked to pick one. Be sure to choose `SwyftApp`. 

#License
This project is property of Bharat Arimilli.




