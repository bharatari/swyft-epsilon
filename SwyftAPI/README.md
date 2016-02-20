# Swyft Epsilon API

Swyft Epsilon API is a [Sails](http://sailsjs.org) application. Sails.js is a enterprise-grade Node.js framework designed for rapidly building client-agnostic backends. The Swyft Epsilon API project solely contains server code, while the web client of Swyft Epsilon is developed under a separate Ember.js-based Swyft Epsilon Online project.

# Development

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Sails.js](http://sailsjs.org/)

## Installation

* `git clone https://github.com/bharatari/swyft-epsilon.git` this repository
* change into the new directory
* change into `SwyftAPI`
* `npm install`

## Running / Development

* `sails lift`
* Visit [http://localhost:1337](http://localhost:1337).`

## Deploying

Swyft Epsilon API and Swyft Epsilon Online, the server-side and client-side implementations of Swyft's web infrastructure, respectively, are developed separately in order to promote modularity and stability. For production, however, the Swyft Epsilon Online project is hosted with this Swyft Epsilon API server. A combined build is created in a folder called SwyftDeploy using a grunt task that can be run by `grunt default`. If changes have been made to Swyft Epsilon Online, follow the steps listed in its deployment guide. If no changes have been made to SwyftOnline, run `grunt default` in the root Swyft directory to populate SwyftDeploy with updated code.

Ensure that all development environment settings, such as CORS have been switched off within Swyft Epsilon API. Assuming you have already run the `grunt default` command (in the Swyft root directory), the SwyftDeploy folder in the root Swyft directory should be populated with a ready-to-deploy build. The SwyftDeploy folder should be a git repository with the remote set to a private hosted Git repository.

### Update existing deployment

* Commit the new build/changes to the private SwyftDeploy repository
* Move to the production VM (virtual machine)
* Switch to the folder where the Swyft Epsilon code exists
* `git pull <repository-url>`  to pull these changes from the hosted SwyftDeploy repository
* `npm install`
* `node forever.js`

### First deployment

* Run `grunt default` to combine built SwyftOnline files and SwyftAPI into a SwyftDeploy folder
* Create a git repository in the SwyftDeploy folder
* Create a private hosted Git repository (on Bitbucket, for example) and set the remote of the local SwyftDeploy repository to this hosted repository
* Commit the contents of the SwyftDeploy folder and push to the remote
* Move to the production VM (virtual machine)
* Switch to a folder to clone the hosted SwyftDeploy repository
* `git clone <repository-url>`
* Switch into the cloned repository
* `npm install`
* `node forever.js`

## Credentials

When you clone this repository, you'll need to add a local.js file in the `/config` folder that looks like this:

    module.exports = {
      jwtTokenSecret: 'some-random-string',
      mandrillKey: 'mandrill-api-key',
      stripeKey: 'stripe-api-key',

      connections: {
        MongoDev: {
          user: 'username',
          password: 'password',
          database: 'database name'
        },
        Mongo: {
          user: 'username',
          password: 'password',
          database: 'database name'
        }
      },

      session: {
        secret: 'some-random-string',
        username: 'username',
        password: 'password'
      }
    }

## Features

### Automatic Delivery Service

Swyft Epsilon API has an Automatic Delivery Management feature that creates and closes deliveries automatically based on a predefined schedule.

This predefined schedule is contained within the `deliveryPeriods` MongoDB collection. The resulting deliveries are contained within the `deliveries` collection. Automatically created deliveries have a `autoDelivery` attribute set to `true`, which flags the delivery for automatic closing. To manage a delivery manually, simply set the `autoDelivery`  property to `false`.

If an automatically created delivery needs to be removed (in the case that operations are not running that specific day), simply deleting the delivery will cause the automatic service to create another delivery in it's place. The record in `deliveryPeriods` needs to be disabled, which will stop the system from automatically creating deliveries based on that schedule, and then the delivery itself in `deliveries` can be deleted.

### Limitations

The `user` property is used to manage admin authentication, and therefore it should not be used as a property on models or for any other purpose. On Admin CRUD, for models that have joined data there is a conflict as the `user` property is used to authenticate changes, and is also used to store joined user data. In this case, it's best to use the alternative admin authentication property `_user` and then use `user` for the joined data. Because `user` and `_user` are not properties on any model, they are always deleted on the server before requests are processed.

The `token` property should be used with caution. It is generally reserved for admin authentication on req.query.token and req.query.tokenId. For request bodies, the token is reserved on req.body.user.token.

### Dynamic Roles System

The Swyft Epsilon dynamic roles system allows for administrators to manage the access and abilities a Swyft Admin user has. This system will allow for Swyft Admin to become a universal portal for all personnel, instead of having separate parts of the site  dedicated to specifc types of personnel. Under this change, Swyft Delivery will eventually be folded into Swyft Admin as a specialized order view.

The `admin` role allows full Admin access. Full access consists of `admin-basic` for Dashboard and About access, `admin-view` for CRUD model viewing, `admin-update` for CRUD update, `admin-delete` for CRUD delete, `admin-wizard` for access to Swyft Admin Wizards and `admin-export`.

`admin-basic` and `admin-export` are single-level roles, as in they don't have deeper customization. CRUD roles can be limited by model with: `admin-<action>:<model identity>`. Giving a user a CRUD role such as `admin-delete` gives them the ability to delete any model. If you wanted a user to only be able to delete records of one model, you would have `admin-delete:<model identity>`. If you wanted to give a user delete (and view) access to all models except one, you would have `admin-delete` and `except:admin-delete:<model identity>`. Every CRUD role automatically gives the user `admin-view` or `admin-view:<model>` access, though this should be explicity included as well.

The system will first check for high-level actions relevant to the action being requested. For a create request, it will check for either `admin` or `admin-create` or `admin-create:<model>`, if one of these exists, then it will check for exceptions `except:admin-create` or `except:admin-create:<model>`.

For a view request, the system will first check for `admin`, `admin-view`, `admin-view:<model>`, `admin-create`, `admin-create:<model>`, `admin-delete`, `admin-delete:<model>`, `admin-update` or `admin-update:<model>`. It will check for exceptions, but as long as there is one valid CRUD action on the model, view access will be granted. That is, even if admin-delete and admin-create is not allowed for the model, if admin-update is allowed, admin-view will be allowed for that model. An exception to admin-view for the model will not apply if there is a valid CRUD action on the model for that user.

In cases where there is a role and the exact same exception to that role, the exception takes precedence.

`except:admin`, `except:admin-basic` are not valid exceptions.

`except` is a reserved keyword. It cannot be used to denote a role. Any role beginning with `except:` will be treated as an exception.

The `master` role gives full Admin access and ignores all exceptions. This role should be used only for select personnel.

As of Swyft Epsilon 4.3.7, the dynamic roles system was downsized into a simpler implementation inherited from Swyft Epsilon's former roles implementation. This system uses two earlier roles `admin` and `delivery`. The `admin` route gives users full access to Swyft Admin while `delivery` provides access to a subset of Swyft Admin. The downsized roles system allowed for a rapid shift to a unified Swyft Admin experience with very few changes needed in other parts of the system.


# License

Copyright 2016 Bharat Arimilli.
This project is property of Bharat Arimilli.




