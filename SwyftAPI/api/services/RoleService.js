module.exports = {
  /*** 
   *
   * @section - External Service Methods 
   *
   */

  //we should check to make sure that the roles array is an array of strings, if not just cb(false) immediately
  canUpdate: function (user, model, cb) {
    var parent = "admin-update"
    var role = parent + ":" + model;
    if (user) {
      if (user.roles) {
        var array = UtilityService.splitCSV(user.roles);
        var roles = this.splitRoles(array);
        var roleExceptions = this.splitRoleException(array);
        this.filterRoles(roles, roleExceptions);
        this.removeExceptions(roles, roleExceptions);
        if (this.fullAccess(roles, roleExceptions, role, parent)) {
          cb(true);
        } else {
          if (this.containsRoleException(roleExceptions, role)) {
            cb(false);
          } else {
            if (this.containsRole(roles, parent)) {
              cb(true);
            } else if (this.containsRole(roles, role)) {
              cb(true);
            } else {
              cb(false);
            }
          }
        }
      } else {
        cb(false);
      }
    } else {
      cb(false);
    }
  },
  canCreate: function (user, model, cb) {
    var parent = "admin-create"
    var role = parent + ":" + model;
    if (user) {
      if (user.roles) {
        var array = UtilityService.splitCSV(user.roles);
        var roles = this.splitRoles(array);
        var roleExceptions = this.splitRoleException(array);
        this.filterRoles(roles, roleExceptions);
        this.removeExceptions(roles, roleExceptions);
        if (this.fullAccess(roles, roleExceptions, role, parent)) {
          cb(true);
        } else {
          if (this.containsRoleException(roleExceptions, role)) {
            cb(false);
          } else {
            if (this.containsRole(roles, parent)) {
              cb(true);
            } else if (this.containsRole(roles, role)) {
              cb(true);
            } else {
              cb(false);
            }
          }
        }
      } else {
        cb(false);
      }
    } else {
      cb(false);
    }
  },
  canDelete: function (user, model, cb) {
    var parent = "admin-delete"
    var role = parent + ":" + model;
    if (user) {
      if (user.roles) {
        var array = UtilityService.splitCSV(user.roles);
        var roles = this.splitRoles(array);
        var roleExceptions = this.splitRoleException(array);
        this.filterRoles(roles, roleExceptions);
        this.removeExceptions(roles, roleExceptions);
        if (this.fullAccess(roles, roleExceptions, role, parent)) {
          cb(true);
        } else {
          if (this.containsRoleException(roleExceptions, role)) {
            cb(false);
          } else {
            if (this.containsRole(roles, parent)) {
              cb(true);
            } else if (this.containsRole(roles, role)) {
              cb(true);
            } else {
              cb(false);
            }
          }
        }
      } else {
        cb(false);
      }
    } else {
      cb(false);
    }
  },
  canView: function (user, model, cb) {
    var parent = "admin-view"
    var createParent = "admin-create";
    var updateParent = "admin-update";
    var deleteParent = "admin-delete";
    var role = parent + ":" + model;
    var createRole = createParent + ":" + model;
    var updateRole = updateParent + ":" + model;
    var deleteRole = deleteParent + ":" + model;
    if (user) {
      if (user.roles) {
        var array = UtilityService.splitCSV(user.roles);
        var roles = this.splitRoles(array);
        var roleExceptions = this.splitRoleException(array);
        this.filterRoles(roles, roleExceptions);
        this.removeExceptions(roles, roleExceptions);
        if (this.fullAccess(roles, roleExceptions, role, parent)) {
          cb(true);
        } else if (this.fullAccess(roles, roleExceptions, createRole, createParent)) {
          cb(true);
        } else if (this.fullAccess(roles, roleExceptions, updateRole, updateParent)) {
          cb(true);
        } else if (this.fullAccess(roles, roleExceptions, deleteRole, deleteParent)) {
          cb(true);
        } else {
          if (!this.containsRoleException(roleExceptions, createRole) && !this.containsRoleException(roles, createParent) && (this.containsRole(roles, createParent) || this.containsRole(roles, createRole))) {
            cb(true);
          } else if (!this.containsRoleException(roleExceptions, updateRole) && !this.containsRoleException(roles, updateParent) && (this.containsRole(roles, updateParent) || this.containsRole(roles, updateRole))) {
            cb(true);
          } else if (!this.containsRoleException(roleExceptions, deleteRole) && !this.containsRoleException(roles, deleteParent) && (this.containsRole(roles, deleteParent) || this.containsRole(roles, deleteRole))) {
            cb(true);
          } else if (!this.containsRoleException(roleExceptions, role) && !this.containsRoleException(roles, parent) && (this.containsRole(roles, parent) || this.containsRole(roles, role))) {
            cb(true);
          } else {
            cb(false)
          }
        }
      } else {
        cb(false);
      }
    } else {
      cb(false);
    }
  },
  //wizard is name of the route 
  //we need to have something that maps API routes to the names of the wizard routes
  canUseWizard: function (user, wizard, cb) {
    //wizard = "admin-someth
  },
  canUseExport: function (user, cb) {

  },

  /*** 
   *
   * @section - Internal Service Methods 
   *
   */

  /*** 
   * Returns whether user should get a role based on a super-role such as master or admin. Without role and parent, the function simply returns false for admin when role exceptions exist.
   * 
   *
   * @param {string} roles - Array of roles that has already been filtered.
   *
   */
  fullAccess: function (roles, roleExceptions, role, parent) {
    if (roles) {
      var admin = false;
      for (var i = 0; i < roles.length; i++) {
        if (roles[i] === "master") {
          return true;
        } else if (roles[i] === "admin") {
          admin = true;
        }
      }
      if (admin) {
        if (roleExceptions) {
          if (roleExceptions.length === 0) {
            return true;
          } else {
            if (role) {
              if (this.containsRoleException(roleExceptions, role)) {
                return false;
              } else {
                if (parent) {
                  if (this.containsRoleException(roleExceptions, parent)) {
                    return false;
                  } else {
                    return true;
                  }
                } else {
                  return true;
                }
              }
            } else {
              //If role is undefined, that means the function is looking for true full-access, so return false because exceptions exist.
              return false;
            }
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  //Start at top, can't have exceptions there
  //Move down, remove mid-tier exceptions and lower children of the mid-tier exception
  /*** 
   * Returns valid roles by removing roles that have corrolating role exceptions. Filters
   * redundancies. This does not necessarily validate a user for an action because 
   * checks still have to occur above and below the heirarcy.
   *
   * @param {string} roles - Comma separated list of roles.
   *
   */
  splitRoles: function (array) {
    var roles = [];
    for (var i = 0; i < array.length; i++) {
      if (typeof array[i] === "string") {
        if (array[i].substring(0, 7) !== "except:") {
          roles.push(array[i]);
        }
      }
    }
    return roles;

  },
  splitRoleException: function (array) {
    var roleExceptions = [];
    for (var i = 0; i < array.length; i++) {
      if (typeof array[i] === "string") {
        if (array[i].substring(0, 7) === "except:") {
          roleExceptions.push(array[i]);
        }
      }
    }
    return roleExceptions;
  },
  filterRoles: function (roles, roleExceptions) {
    if (roles && roleExceptions) {
      this.removeInvalidExceptions(roleExceptions);
      for (var i = 0; i < roles.length; i++) {
        for (var e = 0; e < roleExceptions.length; e++) {
          if (roleExceptions[e] === "except:" + roles[i]) {
            roles.splice(i, 1);
            roleExceptions.splice(e, 1);
            e--;
            i--;
          }
        }
      }
    }
  },
  //have a function that removes all roles, and exceptions that don't match the correct regex
  //
  removeInvalidExceptions: function (array) {
    if (array) {
      for (var i = 0; i < array.length; i++) {
        for (var e = 0; e < this.invalidRoles.length; e++) {
          if (array[i] === this.invalidRoles[e]) {
            array.splice(i, 1);
            i--;
          }
        }
      }
    }
  },
  invalidRoles: [
    'except:master',
    'except:admin',
    'except:admin-basic'
  ],
  /*** 
   * Removes roles with roleExceptions and all of their children.
   *
   * @param {string} roles - Array of roles that has already been filtered.
   *
   */
  //doesn't take out 'admin' for CRUD stuff
  removeExceptions: function (roles, roleExceptions) {
    if (roles && roleExceptions) {
      for (var i = 0; i < roles.length; i++) {
        for (var e = 0; e < roleExceptions.length; e++) {
          var role = this.removeExcept(roleExceptions[e]);
          if (role) {
            if (typeof role === 'string') {
              if (roles[i].substring(0, role.length) === role) {
                roles.splice(i, 1);
                roleExceptions.splice(e, 1);
                e--;
                i--;
              }
            }
          }
        }
      }
    }
  },
  removeExcept: function (roleException) {
    if (typeof roleException === "string") {
      roleException = roleException.substring(7, roleException.length);
    }
    return roleException;
  },
  containsRole: function (roles, role) {
    if (roles && role) {
      for (var i = 0; i < roles.length; i++) {
        if (role === roles[i]) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  },
  containsRoleException: function (roleExceptions, role) {
    if (roleExceptions && role) {
      for (var i = 0; i < roleExceptions.length; i++) {
        if (roleExceptions[i] === "except:" + role) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
}