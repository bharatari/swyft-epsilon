/* global describe */
import { it } from 'ember-mocha';
import { assert } from 'chai';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';

describe("modelUtils#valueExists", function() {
    it("should return true when the value exists in the array", function() {
        var array = [
            'Main Street Hall',
            'Peabody Hall',
            'Ewald Hall',
            'Webster Hall',
            'Langdell Hall'
        ];
        var value = 'Webster Hall';
        var result = modelUtils.valueExists(value, array);
        assert.isTrue(result);
    });    
    it("should return false when the value does not exist in the array", function() {
        var array = [
            'Main Street Hall',
            'Peabody Hall',
            'Ewald Hall',
            'Webster Hall',
            'Langdell Hall'
        ];
        var value = 'Webster';
        var result = modelUtils.valueExists(value, array);
        assert.isFalse(result);
    });  
    it("should return false when the value is null or undefined", function() {
        var array = [
            'Main Street Hall',
            'Peabody Hall',
            'Ewald Hall',
            'Webster Hall',
            'Langdell Hall'
        ];
        var value = null;
        var result = modelUtils.valueExists(value, array);
        assert.isFalse(result);
    }); 
    it("should return false when the array is null or undefined", function() {
        var array = null;
        var value = 'Webster Hall';
        var result = modelUtils.valueExists(value, array);
        assert.isFalse(result);
    }); 
    it("should return false when the array and value are null or undefined", function() {
        var array = null;
        var value = null;
        var result = modelUtils.valueExists(value, array);
        assert.isFalse(result);
    }); 
    it("should return false when the array is empty", function() {
        var array = [];
        var value = 'Webster Hall';
        var result = modelUtils.valueExists(value, array);
        assert.isFalse(result);
    }); 
    it("should return false when array is missing", function() {
        var value = 'Webster Hall';
        var result = modelUtils.valueExists(value);
        assert.isFalse(result);
    });
    it("should return false when value and array are missing", function() {
        var result = modelUtils.valueExists();
        assert.isFalse(result);
    });
});