# Swyft Epsilon API

Swyft Epsilon API is a [Sails](http://sailsjs.org) application. Sails.js is a enterprise-grade Node.js framework designed for rapidly building client-agnostic backends. The Swyft Epsilon API project solely contains server code, while the web client of Swyft Epsilon is developed under a separate Ember.js-based Swyft Epsilon Online project.

#Firefly
Swyft Epsilon is an implementation of the Firefly framework. Firefly is designed to be a modular framework that can be used for a variety of small business applications and some CMS-style functionality. Unlike frameworks such as Sails.js, however, Firefly does not aim to be a full-on framework that can be used as a library, instead it provides modular solutions to common data-driven website needs. Some commonly used utility functions may be pulled out into a small JavaScript library, however, this is only to allow for more modularity and easily testable code. The Firefly framework was originally born within the Swyft Epsilon project itself, but the Epsilon project's focus on a modular and extensible web application structure means that it's code and concepts can be easily repurposed. Firefly will continue to be developed in tandem with the Epsilon project and will not have it's own software release cycle. Firefly is a way to structure your application, with useful components and paradigms. Think of Firefly as a very detailed blueprint, while still giving you the freedom to design your application as needed using your favorite application frameworks. Firefly may become a self-contained CMS application, that can be hosted as a service, somewhat on the lines of WordPress.com.

When it comes to naming components of the Swyft Epsilon application highly-modular and reusable parts of the application are considered Firefly components while components that are geared towards specific use (but still might be modular) are considered Epsilon components. For example, the project's commenting system is considered a Firefly component because it can be reused elsewhere.

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

## Tests
Components are structured with describeComponent at the top level, with tests such as render residing under that top level. Then for functions you should have another describe with the name of the function prefixed with a '#'. Under that describe you use the it syntax to describe each test for that function.

## Features

### Automatic Delivery Service
From Version 3, Epsilon has had an Automatic Delivery Management feature that creates and closes deliveries automatically based on a predefined schedule. This predefined schedule is contained within the `deliveryPeriods` MongoDB collection. The resulting deliveries are contained within the `deliveries` collection. Automatically created deliveries have a `autoDelivery` attribute set to `true`, which flags the delivery for automatic closing. If one wants to create a delivery that is manually closed, simply set this property to `false`. If an automatically created delivery needs to be removed (in the case that operations are not running that specific day), simply deleting the delivery will cause the automatic service to create another delivery in it's place. The record in `deliveryPeriods` needs to be disabled, which will stop the system from automatically creating deliveries based on that schedule, and then the delivery itself in `deliveries` can be deleted. 

### Notes
The `/** HARDCODE **/` flag is used to label a function that does not work in a modular or data-agnostic fashion. 
The `/** FUTURE **/` flag is used to label properties or functions that exist to accomodate future expansion, but are not used currently.
The `/** TEMPORARY **/` flag is used to label properties or functions that exist to accomodate current circumstances, but will be changed soon.

The attachedRequests evolved from comboOptions and is now a property that can be used for any properties that are used more than once across menu items. Each menu item that uses an attachedRequest will specify them in a comma-separated list of AttachedRequest Id values. Each AttachedRequest has a name, an array of options, and then properties to determine when the options should be shown to the user. 'Available' determines how the 'watches', and 'on' properties will be relevant. 'Watches' watches a specific variable for changes, and on describes what property is relevant to us. Options in the `options` array must contain a `name` property and can optionally contain a `price` property.

### Limitations
The `user` property is used to manage admin authentication, and therefore it should not be used as a property on models or for any other purpose. On Admin CRUD, for models that have joined data there is a conflict as the `user` property is used to authenticate changes, and is also used to store joined user data. In this case, it's best to use the alternative admin authentication property `_user` and then use `user` for the joined data. Because `user` and `_user` are not properties on any model, they are always deleted on the server before requests are processed.

The `token` property should be used with caution. It is generally reserved for admin authentication on req.query.token and req.query.tokenId. For request bodies, the token is reserved on req.body.user.token. 

Internal Models defined in ModelService or model-utils (on the client) must follow strict guidelines regarding passed-in parameters. If a parameter is not passed in or if a parameter isn't being used at the time of instantiation, it's value should be falsey. For unused parameters simply pass in the value `null`.

### Comments
Swyft Epsilon uses the JSDoc convention for most commenting. However, for comment use-cases that are not covered by JSDoc, Swyft Epsilon uses its own internal commenting syntax. Comments are started with `/***` to differentiate its comments from JSDoc comments. Every line following the initial line starts with a `*` single spaced to the right. Content is then written single spaced from each `*`. The comment is then ended on the next line with `*/`, which should line up with the content declaration `*`'s. The inline form begins with `/***` and content is single spaced from the initial comment declaration. The commented is ended with a space and `*/`. The only time content can be written on the same line as the initial comment declaration is when using the inline form. The dash between the comment type declaration and the content is not required by highly recommended for readability. Finally, comments don't need comment types, but the types available should cover most cases.

`
    /***
     *
     * @temporary - This will be removed once the Notification Center feature is complete.
     *
     */
`

`
    /***
     *
     * @section - Automatic Delivery Management 
     *
     */
`     
     
`
    /***
     *
     * @future - Accomodates ability for a delivery to split into multiple fulfillments.
     *
     */
`

`
    /***
     *
     * @watch - Just refactored this code, and we need to watch out for bugs.
     *
     */
`

`
    /***
     *
     * @todo - Make sure this works with object arrays.
     *
     */
`

`
    /***
     *
     * @warning - This function is very volatile, do not change.
     *
     */
`
`
    /***
     *
     * @bug - This function doesn't work due to something.
     *
     */
`

We have tags that work especially well for CSS. Tags can be especially useful. You can use tags as you normally would, applying tags to group declarations together. However, a unique way to use tags is to create unique tag signatures. If you have multiple declarations that are very closely related you can create a list of tags that you copy exactly to each declaration, giving you a simple way to group them together while also helping explain the classes themselves.

`   /***
     *
     * @tag - vendor-prefix, html5
     *
     */
     
    /***
     *
     * @usedby - whatever page/component 
     *
     */
    
    /***
     *
     * Swyft Epsilon Online CSS
     *
     * Your description would go here.
     * @file app.css
     * @project - Swyft Epsilon Online
     * @codename - swyft-epsilon-online
     * @version - 1.0
     * @author - Bharat Arimilli
     * @collaborators - Jane Doe, John Doe
     * @copyright - 2015
     * @license - Some License 
     * @css-support-min - IE9 (minimum browser versions) 
     * @css-support-except - Chrome 42, >IE9 (if there is a specific exception from the minimum or css-support declaration, or if you need to declare maximum browser versions)
     * @css-support-tested - IE11, Edge, Chrome (list browser version that have been specifically tested)
     * @css-support - IE9, Safari, Edge, Opera, Chrome (list browsers and/or browser versions that are supported)
     *
     */
     
    /***
     *
     * @fix - Making something work in Safari (fix just denotes CSS specific to a browser to make something work)
     * @fix-for - Safari 
     *
     */
     
    /***
     *
     * @workaround - Simulating some modern CSS feature (workaround is best for legacy CSS hacks)
     * @workaround-for - IE8
     *
     */
`

You can also use a condensed block form (although the normal block form is recommended).

`  /***
    * @tag - vendor-prefix, html5
    */
`   

Firefly comments can be written in inline or block form.

`
    /*** @future - Accomodates ability for a delivery to split into multiple fulfillments */
`
  
`
    /*** @note - Values should be comma-separated */
`

You should not try to mix both forms as comments will become confusing and less readable.

`
    /*** @future -  Accomodates ability for a delivery to split into multiple fulfillments 
     *
     * Do not do this
     *
     */
`

#### Contents + Sections
Sections allow you to organize code files into logical sections.

`
    /***
     *
     * @section - Automatic Delivery Management 
     *
     */
`   

For large code files, such as CSS files, it may be necessary to organize code into sections and mark them. The top level sections follow the same single space convention from the `*`. Sub-sections are triple-spaced from their parents, and there is no limit on the levels of sub-sections that exist.

`
    /***
     *
     * @contents - Table of Contents
     *
     * 1. CSS Resets
     *    1. More sections
     *    2. Go here
     *       1. Even more sections
     * 2. General
     * 3. Utilities
     * 4. General
     * 5. Single Post
     *
     */
`

Finally to declare a section:

`
    /***
     *
     * @section - 1. CSS Resets
     * 
     * This section contains CSS Resets borrowed from Normalize.css.
     *
     */
     
    /*** @section - 1. CSS Resets */ 
    
    /***
     *
     * @section - 1.2.1 Even more sections
     *
     */
`
### Deploying

SwyftAPI and SwyftOnline, the server-side and client-side implementations of Swyft's web infrastructure, respectively, are developed separately in order to promote modularity and stability. 

For production, however, the SwyftOnline project is hosted with this SwyftAPI server. If changes have been made to SwyftOnline, follow the steps listed in its deployment guide.

Ensure that all development environment settings, such as CORS have been switched off within SwyftAPI.

Once the proper SwyftOnline files have been setup and necessary changes haves been made to the server for productiojn, simply change to the SwyftAPI root folder in a Node.js console and `modulus deploy`. You may be asked to login to your Modulus.io account, and if you have multiple projects associated with your account, you will be asked to pick one. Be sure to choose `SwyftApp`. 

# Future 
## Delivery Management
Swyft Epsilon has been built with future expansion in mind. Fulfillments and ASAP orders are two ways of accomodating larger and more complex logistics scenarios.
#License
Copyright 2015 Bharat Arimilli.
This project is property of Bharat Arimilli.




