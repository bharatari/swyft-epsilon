var assert = require('chai').assert;
var expect = require('chai').expect;
var moment = require('moment');

describe('DeliveryService', function () {
  describe('#processOffset()', function () {
    it('should return number if offset is a number', function () {
      var offset = DeliveryService.processOffset(23);
      assert.equal(offset, 23);
    });
    it('should return parsed integer if offset is a string', function () {
      var offset = DeliveryService.processOffset('23');
      assert.equal(offset, 23);
    });
  });
  describe('#processDeliveryOffset()', function () {
    it('should process delivery offset', function () {
      var deliveryDate = moment().day("Monday").set({
        hour: 10,
        minute: 10,
        second: 10,
        milliseconds: 10
      });
      var result = moment(DeliveryService.processDeliveryOffset(deliveryDate, 20));
      var expected = moment().day("Monday").set({
        hour: 10,
        minute: 30,
        second: 10,
        milliseconds: 10
      });
      assert.isTrue(result.isSame(expected));
    });
  });
  describe('#processArrivalOffset()', function () {
    it('should process arrival offset', function () {
      var scheduledArrival = moment().day("Monday").set({
        hour: 10,
        minute: 10,
        second: 10,
        milliseconds: 10
      });
      var result = moment(DeliveryService.processArrivalOffset(scheduledArrival, 20));
      var expected = moment().day("Monday").set({
        hour: 10,
        minute: 30,
        second: 10,
        milliseconds: 10
      });
      assert.isTrue(result.isSame(expected));
    });
  });
  describe('#setDeliveryOffset()', function () {
    it('should offset for a valid delivery', function (done) {
      var deliveryId = '56798eb1ef2b22f44f738535';
      var offset = 20;
      Delivery.findOne({
        id: deliveryId
      }).exec(function (err, delivery) {
        DeliveryService.setDeliveryOffset(offset, '56798eb1ef2b22f44f738535', function (err, result) {
          var estimatedArrival = moment(result.estimatedArrival);
          var expectedArrival = moment(delivery.scheduledArrival).add(offset, 'minutes');
          var estimatedDelivery = moment(result.estimatedDelivery);
          var expectedDelivery = moment(delivery.deliveryDate).add(offset, 'minutes');
          assert.isTrue(estimatedArrival.isSame(expectedArrival));
          assert.isTrue(estimatedDelivery.isSame(expectedDelivery));
          done();
        });
      });
    });
    it('should offset not change scheduled values', function (done) {
      var deliveryId = '56798eb1ef2b22f44f738535';
      var offset = 20;
      Delivery.findOne({
        id: deliveryId
      }).exec(function (err, delivery) {
        DeliveryService.setDeliveryOffset(offset, '56798eb1ef2b22f44f738535', function (err, result) {
          var scheduledArrival = moment(result.scheduledArrival);
          var originalScheduledArrival = moment(delivery.scheduledArrival);
          var deliveryDate = moment(result.deliveryDate);
          var originalDeliveryDate = moment(delivery.deliveryDate);
          assert.isTrue(originalScheduledArrival.isSame(scheduledArrival));
          assert.isTrue(originalDeliveryDate.isSame(deliveryDate));
          done();
        });
      });
    });
    it('should not compound offset', function (done) {
      var deliveryId = '56798eb1ef2b22f44f738535';
      var offset = 20;
      var offset2 = 10;
      Delivery.findOne({
        id: deliveryId
      }).exec(function (err, delivery) {
        DeliveryService.setDeliveryOffset(offset, '56798eb1ef2b22f44f738535', function (err, result) {
          var estimatedArrival = moment(result.estimatedArrival);
          var expectedArrival = moment(delivery.scheduledArrival).add(offset, 'minutes');
          var estimatedDelivery = moment(result.estimatedDelivery);
          var expectedDelivery = moment(delivery.deliveryDate).add(offset, 'minutes');
          assert.isTrue(estimatedArrival.isSame(expectedArrival));
          assert.isTrue(estimatedDelivery.isSame(expectedDelivery));
          DeliveryService.setDeliveryOffset(offset2, '56798eb1ef2b22f44f738535', function (err, result2) {
            var estimatedArrival2 = moment(result2.estimatedArrival);
            var expectedArrival2 = moment(delivery.scheduledArrival).add(offset2, 'minutes');
            var estimatedDelivery2 = moment(result2.estimatedDelivery);
            var expectedDelivery2 = moment(delivery.deliveryDate).add(offset2, 'minutes');
            assert.isTrue(estimatedArrival2.isSame(expectedArrival2));
            assert.isTrue(estimatedDelivery2.isSame(expectedDelivery2));
            done();
          });
        });
      });
    });
  });
});