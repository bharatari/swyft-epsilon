/* global describe */
/* global localStorage */
import { it } from 'ember-mocha';
import { assert } from 'chai';
import config from 'swyft-epsilon-online/config/environment';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';

describe("cartUtils#getCartForRestore", function() {
    it("returns cart when cart exists", function(done) {
        localStorage.clear();
        var object = [{"name":"Big Mac","id":"549a7c80f2ede1f4234eecca","quantity":1,"restaurant":"mcdonalds","standardOptions":[],"options":[{"price":2.9,"name":"Medium Meal","category":"Meal"}],"extras":[],"attachedRequests":[{"name":"Coke"}],"price":8.2},{"name":"Burrito","id":"549a7c80f2ede1f4234eed0c","quantity":1,"restaurant":"lasolas","standardOptions":[{"name":"Cheese","isSelected":true}],"options":[{"price":1.4,"name":"Chorizo","category":"Meat"},{"name":"Refried Beans","category":"Beans"},{"name":"Hot Salsa","category":"Salsa"}],"extras":[],"attachedRequests":[],"price":8.8}];
        localStorage.setItem("cart", JSON.stringify(object));
        assert.deepEqual(cartUtils.getCartForRestore(), object);
        done();
    });    
    it("returns cart when cart exists", function(done) {
        localStorage.clear();
        var object = [{"name":"Big Mac","id":"549a7c80f2ede1f4234eecca","quantity":1,"restaurant":"mcdonalds","standardOptions":[],"options":[{"price":2.9,"name":"Medium Meal","category":"Meal"}],"extras":[],"attachedRequests":[{"name":"Coke"}],"price":8.2},{"name":"Burrito","id":"549a7c80f2ede1f4234eed0c","quantity":1,"restaurant":"lasolas","standardOptions":[{"name":"Cheese","isSelected":true}],"options":[{"price":1.4,"name":"Chorizo","category":"Meat"},{"name":"Refried Beans","category":"Beans"},{"name":"Hot Salsa","category":"Salsa"}],"extras":[],"attachedRequests":[],"price":8.8}];
        localStorage.setItem("cart", JSON.stringify(object));
        assert.deepEqual(cartUtils.getCartForRestore(), object);
        done();
    });  
    // If the cart is invalid (eg. a number or a boolean), it should be handled elsewhere
    // The only thing this code needs to be worrying about is returning whatever value was there before
    it("returns cart when cart is invalid", function(done) {
        localStorage.clear();
        var object = [ 'invalid', 'cart' ];
        localStorage.setItem("cart", JSON.stringify(object));
        assert.deepEqual(cartUtils.getCartForRestore(), object);
        done();
    });  
    it("returns empty array when cart doesn't exist", function(done) {
        localStorage.clear();
        assert.deepEqual(cartUtils.getCartForRestore(), []);
        done();
    });    
});

describe("cartUtils#getCartVersionForRestore", function() {
    it("should return cart version when cartVersion exists and is valid", function(done) {
        localStorage.clear();
        localStorage.setItem("cartVersion", 1);
        assert.equal(cartUtils.getCartVersionForRestore(), 1);
        done();
    });   
    // If the cartVersion is invalid (eg. a number or a boolean), it should be handled elsewhere
    // The only thing this code needs to be worrying about is returning whatever value was there before
    it("should return cartVersion when cartVersion is invalid", function(done) {
        localStorage.clear();
        localStorage.setItem("cartVersion", "invalid cart version");
        assert.equal(cartUtils.getCartVersionForRestore(), "invalid cart version");
        done();
    });  
    it("should return cartVersion when cartVersion is 0", function(done) {
        localStorage.clear();
        localStorage.setItem("cartVersion", 0);
        assert.equal(cartUtils.getCartVersionForRestore(), 0);
        done();
    }); 
    it("should return current cart version from config when cartVersion doesn't exist", function(done) {
        localStorage.clear();
        assert.equal(cartUtils.getCartVersionForRestore(), config.cartVersion);
        done();
    });    
});