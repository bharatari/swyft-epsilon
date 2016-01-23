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

describe('Acceptance: Confirmation', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    Ember.run(application, 'destroy');
  });

  it('can visit /app/confirmation', function(done) {
    visit('/app/login');
    fillIn('input[name="email"]', 'swyfttestmocha@exeter.edu');
    fillIn('input[name="password"]', 'testing');
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
