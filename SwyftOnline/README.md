# Swyft Epsilon Online

Swyft Epsilon Online is the client-side implementation of Swyft's web infrastructure. The client is based on Ember.js using the Ember CLI platform and interacts with the Swyft Epsilon API Sails.js-based server.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone https://github.com/bharatari/swyft-epsilon.git` this repository
* change into the new directory
* change into `SwyftOnline`
* `npm install`
* `bower install`

## Running / Development

* Ensure that an instance of Swyft Epsilon API is running locally on [http://localhost:1337](http://localhost:1337).
* `ember server`
* Visit Swyft Epsilon Online at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Swyft Epsilon API and Swyft Epsilon Online, the server-side and client-side implementations of Swyft's web infrastructure, respectively, are developed separately in order to promote modularity. For production, however, the Swyft Epsilon Online project is hosted with the Swyft Epsilon API server.

* `ember build --environment="production"` in `SwyftOnline` folder
* `grunt default` in the root Swyft directory
* Follow Swyft Epsilon API deployment guide

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

# Features

## CSS

Swyft Epsilon Online extends Bootswatch Cosmo v3.3.1+2, a Bootstrap 3 theme.

## Animations

As of Swyft Epsilon Online 2.6, new features were added to allow for animating route transitions. Wrap the body of the content you want to animate in and out with an `animate-body` component.

> `{{#animate-body}}
> // Content to animate
> {{/animate-body}}`

Using the animate-body component automatically enables animate in transitions. You can change the delay before the animation begins by setting the animateDelay property on the animate-body component. To animate out of a route, simply add the `animate-out-route` mixin to the route of the page.

## Modals

Swyft Epsilon Online has its own modal system based on the Bootstrap Modal component. This modal system is exposed as an Ember Component.

There are three types of modals, the first is a standard `modal-dialog` with a dynamically set body of text and a close button. This first modal is best used to replace a JavaScript alert, as it is only designed to present data with no user input. The second is `modal-dialog-dynamic` that is available with a block helper that allows you to dynamically set the body of the modal to any HTML and Handlebars markup. This allows for flexibility in what you present to the user, however, it also doesn't allow for user input. The last type of modal is a `confirmation-dialog`, which is based on the `modal-dialog` component with options for user input.

## Authentication

Swyft Epsilon Online is designed for token-based authentication. There are multiple mixins available to regulate routes by authentication status. The `authenticated-route` mixin restricts pages to authenticated users only. The `admin-route` and `delivery-route` mixins restrict access to authenticated administrators and authenticated delivery personnel, respectively.

## Admin Utilities

Swyft Epsilon Online provides components for building modular administrative interfaces. All administrative routes that use the admin-navigation component must have a currentRoute property within their controller.

## HTML Helpers

### Currency Formatting

The `format-currency` helper aids in formatting currency values properly. The helper defaults to prefixing values with a dollar sign ($).

The `format-subtract-currency` helper subtracts two values and then formats the result as a currency value.

### Date Formatting

The `format-datetime` helper formats JavaScript dates and converts them to Eastern Standard Time.

### Dynamic Property

The `dynamic-property` allows for dynamic properties to be rendered into Ember templates. The helper also supports nested object properties as well. 

Usage:
`{{dynamic-property object propertyName}}`

## Notes

### Admin CRUD Pagination

Records per page is hardcoded on the route page of each Admin CRUD page. It is passed to the server, which passes it to MetaService. So the server treats recordsPerPage dynamically.

### Routes

All consumer facing pages should implement the `SidebarRouteMixin` and all admin pages should implement the `AdminRouteMixin`. 

### Time Zones

Swyft Epsilon Online automatically converts dates to EST time using Moment.js because Swyft only operates in the New England region. This also ensures that dates and times appear normally to our administrators when they are not in the New England region.

### Admin CRUD Notes

When creating a new data record or editing an existing one, you will see three types of inputs. One is a normal white input, one is a grayed out input and the last is a grayed out read only input. The grayed out input means that you can edit the data, but it's not recommended in most situations. 

If changing the total amount on an order, leave the total amount intact just to show how much the order would have costed, and then simply edit the actual amount and then be sure to leave an admin comment of how much the actual amount was originally and how much it was changed to. Be aware that changing the total amount doesn't automatically charge the user again for payment methods such as Swyft Debit or Credit Card. The recommended course of action is to simply add this as a deduction in the customer's Swyft Debit balance, and allow them to pay it off however they choose.

# License

Copyright 2016 Bharat Arimilli.
Swyft Epsilon Online is currently a closed-source project property of Bharat Arimilli.
