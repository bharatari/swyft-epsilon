var assert = require('chai').assert;
var expect = require('chai').expect;
var RoleService = require('../../../api/services/RoleService');

describe('RoleService', function () {
  describe('#canDelete()', function () {
    it('should return true for master', function (done) {
      var user = {
        roles: 'master'
      };
      RoleService.canDelete(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin with no role exceptions', function (done) {
      var user = {
        roles: 'admin'
      };
      RoleService.canDelete(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin-update with no role exceptions', function (done) {
      var user = {
        roles: 'admin-delete'
      };
      RoleService.canDelete(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return false for admin-update with a relevant role exception', function (done) {
      var user = {
        roles: 'admin-delete, except:admin-delete:attached-request'
      };
      RoleService.canDelete(user, "attached-request", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-update with a relevant role exception', function (done) {
      var user = {
        roles: 'except:admin-delete, admin-delete:delivery-period'
      };
      RoleService.canDelete(user, "delivery-period", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-update with incorrect role', function (done) {
      var user = {
        roles: 'admin-delete:delivery-period'
      };
      RoleService.canDelete(user, "order", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for just an exception', function (done) {
      var user = {
        roles: 'except:admin-delete:delivery-period'
      };
      RoleService.canDelete(user, "delivery-period", function (result) {
        assert.isFalse(result);
        done();
      });
    });
  });
  describe('#canCreate()', function () {
    it('should return true for master', function (done) {
      var user = {
        roles: 'master'
      };
      RoleService.canCreate(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin with no role exceptions', function (done) {
      var user = {
        roles: 'admin'
      };
      RoleService.canCreate(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin-update with no role exceptions', function (done) {
      var user = {
        roles: 'admin-create'
      };
      RoleService.canCreate(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return false for admin-update with a relevant role exception', function (done) {
      var user = {
        roles: 'admin-create, except:admin-create:user'
      };
      RoleService.canCreate(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-update with a relevant role exception', function (done) {
      var user = {
        roles: 'except:admin-create, admin-create:user'
      };
      RoleService.canCreate(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-update with incorrect role', function (done) {
      var user = {
        roles: 'admin-create:order'
      };
      RoleService.canCreate(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for just an exception', function (done) {
      var user = {
        roles: 'except:admin-create:delivery-period'
      };
      RoleService.canCreate(user, "delivery-period", function (result) {
        assert.isFalse(result);
        done();
      });
    });
  });
  describe('#canUpdate()', function () {
    it('should return true for master', function (done) {
      var user = {
        roles: 'master'
      };
      RoleService.canUpdate(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin with no role exceptions', function (done) {
      var user = {
        roles: 'admin'
      };
      RoleService.canUpdate(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin-update with no role exceptions', function (done) {
      var user = {
        roles: 'admin-update'
      };
      RoleService.canUpdate(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return false for admin-update with a relevant role exception', function (done) {
      var user = {
        roles: 'admin-update, except:admin-update:user'
      };
      RoleService.canUpdate(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-update with a relevant role exception', function (done) {
      var user = {
        roles: 'except:admin-update, admin-update:user'
      };
      RoleService.canUpdate(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-update with incorrect role', function (done) {
      var user = {
        roles: 'admin-update:order'
      };
      RoleService.canUpdate(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for just an exception', function (done) {
      var user = {
        roles: 'except:admin-update:delivery-period'
      };
      RoleService.canUpdate(user, "delivery-period", function (result) {
        assert.isFalse(result);
        done();
      });
    });
  });
  describe('#canView()', function () {
    it('should return true for master', function (done) {
      var user = {
        roles: 'master'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin with no role exceptions', function (done) {
      var user = {
        roles: 'admin'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin-view with no role exceptions', function (done) {
      var user = {
        roles: 'admin-view'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin-update with no role exceptions', function (done) {
      var user = {
        roles: 'admin-update'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin-create with no role exceptions', function (done) {
      var user = {
        roles: 'admin-create'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin-delete with no role exceptions', function (done) {
      var user = {
        roles: 'admin-delete'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin-update with admin-create role exception', function (done) {
      var user = {
        roles: 'admin-update, admin-create, except:admin-create:user'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return true for admin without update, create, and delete roles but without an explicit except:admin-view', function (done) {
      var user = {
        roles: 'admin, except:admin-update, except:admin-create, except:admin-delete'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isTrue(result);
        done();
      });
    });
    it('should return false for admin-delete with relevant role exception', function (done) {
      var user = {
        roles: 'admin-delete, except:admin-delete:user'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-view with a relevant role exception', function (done) {
      var user = {
        roles: 'admin-view, except:admin-view:user'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-view with a relevant role exception', function (done) {
      var user = {
        roles: 'except:admin-view, admin-view:user'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin-update with incorrect role', function (done) {
      var user = {
        roles: 'admin-view:order'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for admin with role exceptions for all CRUD roles', function (done) {
      var user = {
        roles: 'admin, except:admin-update, except:admin-create, except:admin-delete, except:admin-view'
      };
      RoleService.canView(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for user with no roles property', function (done) {
      var user = {
        name: "Customer"
      };
      RoleService.canView(user, "user", function (result) {
        assert.isFalse(result);
        done();
      });
    });
    it('should return false for just an exception', function (done) {
      var user = {
        roles: 'except:admin-view:delivery-period'
      };
      RoleService.canView(user, "delivery-period", function (result) {
        assert.isFalse(result);
        done();
      });
    });
  });
  describe('#fullAcesss() - 2 parameters', function () {
    it('should return true for master', function () {
      var roles = [
        'master',
        'admin'
      ];
      var roleExceptions = [
        'except:admin-export'
      ];
      assert.isTrue(RoleService.fullAccess(roles, roleExceptions));
    });
    it('should return true for admin without role exceptions', function () {
      var roles = [
        'admin'
      ];
      var roleExceptions = [];
      assert.isTrue(RoleService.fullAccess(roles, roleExceptions));
    });
    it('should return false for admin with role exceptions', function () {
      var roles = [
        'admin',
      ];
      var roleExceptions = [
        'except:admin-export'
      ];
      assert.isFalse(RoleService.fullAccess(roles, roleExceptions));
    });
    it('should return false for non-full access role', function () {
      var roles = [
        'admin-export',
        'admin-create:user'
      ];
      var roleExceptions = [];
      assert.isFalse(RoleService.fullAccess(roles, roleExceptions));
    });
    it('should return false for no roles', function () {
      var roles = [];
      var roleExceptions = [];
      assert.isFalse(RoleService.fullAccess(roles, roleExceptions));
    });
  });
  describe('#fullAcesss() - 4 parameters', function () {
    it('should return true for master', function () {
      var roles = [
        'master'
      ];
      var roleExceptions = [
        'except:admin-export'
      ];
      assert.isTrue(RoleService.fullAccess(roles, roleExceptions, "admin-export"));
    });
    it('should return true for non-relevant role exception', function () {
      var roles = [
        'admin'
      ];
      var roleExceptions = [
        'except:admin-export'
      ];
      assert.isTrue(RoleService.fullAccess(roles, roleExceptions, "admin-create:user", "admin-create"));
    });
    it('should return false for relevant role exception', function () {
      var roles = [
        'admin'
      ];
      var roleExceptions = [
        'except:admin-export'
      ];
      assert.isFalse(RoleService.fullAccess(roles, roleExceptions, "admin-export"));
    });
  });
});