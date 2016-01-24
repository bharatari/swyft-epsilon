/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import loginUtils from '../../utils/login-utils';

describe('Acceptance: Confirmation', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    Ember.run(application, 'destroy');
  });

  /* Need fix in 2.x for this */
  it('can visit /app/confirmation', function(done) {
    loginUtils.logout().then((response) => {
      visit('/app/login');
      fillIn('input[type="text"]', 'swyfttestmocha@exeter.edu');
      fillIn('input[type="password"]', 'testing');
      click('button[type="submit"]');
      andThen(() => {
        visit('/app/item/549a7c80f2ede1f4234eed07');
        click('button[type="submit"]');
        andThen(() => {
          visit('/app/checkout');
          click('.payment-list-group:nth-child(2) input');
          click('.delivery-list-group:nth-child(2) input');
          click('button[type="submit"]');
          andThen(() => {
            expect(currentPath()).to.equal('confirmation');
            expect(find('confirmation-text').to.equal('Your order is on its way.'));
            done();
          })
        });
      });
    });
    
  });
});
