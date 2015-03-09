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

### Notes
The `/** HARDCODE **/` flag is used to label a function that does not work in a modular or data-agnostic fashion. 
  
### Deploying

SwyftAPI and SwyftOnline, the server-side and client-side implementations of Swyft's web infrastructure, respectively, are developed separately in order to promote modularity and stability. 

For production, however, the SwyftOnline project is hosted with this SwyftAPI server. If changes have been made to SwyftOnline, follow the steps listed in its deployment guide.

Ensure that all development environment settings, such as CORS have been switched off within SwyftAPI.

Once the proper SwyftOnline files have been setup and necessary changes haves been made to the server for productiojn, simply change to the SwyftAPI root folder in a Node.js console and `modulus deploy`. You may be asked to login to your Modulus.io account, and if you have multiple projects associated with your account, you will be asked to pick one. Be sure to choose `SwyftApp`. 

#License
This project is property of Swyft Web Services and Bharat Arimilli.




