var _ = require('lodash');
var uuid = require('node-uuid');

module.exports = {
  splitCSV: function (csv) {
    if (csv) {
      return csv.split(', ');
    } else {
      return [];
    }
  },
  CSVContains: function (csv, string) {
    if (csv && string) {
      var array = this.splitCSV(csv);
      if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === string) {
            return true;
          }
        }
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  /**
   * @deprecated since domains are no longer a preferred method of error handling. Use promises.
   */
  protect: function (run, onError) {
    var domain = require('domain').create();
    domain.on('error', onError);
    domain.run(run);
  },
  paginationSkip: function (data, recordsPerPage, skip) {
    if (data) {
      var page = (skip / recordsPerPage) + 1;
      var upper = data.length - (page * recordsPerPage);
      data = _.drop(data, skip);
      data = _.dropRight(data, upper);
      return data;
    } else {
      return data;
    }
  },
  sortData: function (data, sortProperty, sortType) {
    if (sortType === 'ASC') {
      return _.sortByOrder(data, [sortProperty], [true]);
    } else if (sortType === 'DESC') {
      return _.sortByOrder(data, [sortProperty], [false]);
    }
  },
  filterData: function (data, filters) {
    for (var i = 0; i < filters.length; i++) {
      data = this.filter(data, filters[i].filterProperty, filters[i].filterType, filters[i].filterValue);
    }
    return data;
  },
  filter: function (data, filterProperty, filterType, filterValue) {
    var newData = [];
    if (typeof filterValue === 'string') {
      if (parseFloat(filterValue) && (parseFloat(filterValue).toString().length === filterValue.length)) {
        filterValue = parseFloat(filterValue);
      } else {
        filterValue = filterValue.toLowerCase();
      }
    }
    if (data) {
      for (var i = 0; i < data.length; i++) {
        if (filterType === 'equalTo') {
          if (typeof this.nestedProperty(data[i], filterProperty) === 'string') {
            if (typeof filterValue === 'string') {
              if (this.nestedProperty(data[i], filterProperty).toLowerCase() === filterValue.toLowerCase()) {
                newData.push(data[i]);
              }
            } else {
              if (this.nestedProperty(data[i], filterProperty) === filterValue) {
                newData.push(data[i]);
              }
            }
          } else {
            if (this.nestedProperty(data[i], filterProperty) === filterValue) {
              newData.push(data[i]);
            }
          }
        } else if (filterType === 'notEqualTo') {
          if (typeof this.nestedProperty(data[i], filterProperty) === 'string') {
            if (typeof filterValue === 'string') {
              if (this.nestedProperty(data[i], filterProperty).toLowerCase() !== filterValue.toLowerCase()) {
                newData.push(data[i]);
              }
            } else {
              if (this.nestedProperty(data[i], filterProperty) !== filterValue) {
                newData.push(data[i]);
              }
            }
          } else {
            if (this.nestedProperty(data[i], filterProperty) !== filterValue) {
              newData.push(data[i]);
            }
          }
        } else if (filterType === 'lessThan') {
          if (this.nestedProperty(data[i], filterProperty) < filterValue) {
            newData.push(data[i]);
          }
        } else if (filterType === 'greaterThan') {
          if (this.nestedProperty(data[i], filterProperty) > filterValue) {
            newData.push(data[i]);
          }
        } else if (filterType === 'contains') {
          if (typeof this.nestedProperty(data[i], filterProperty) === 'string') {
            if (typeof filterValue === 'string') {
              if (this.nestedProperty(data[i], filterProperty).toLowerCase().indexOf(filterValue) !== -1) {
                newData.push(data[i]);
              }
            }
          }
        }
      }
    }
    return newData;
  },
  nestedProperty: function (object, property) {
    if (object && property) {
      if (property.indexOf('.') !== -1) {
        var array = property.split('.');
        var value = object;
        for (var i = 0; i < array.length; i++) {
          if (value) {
            value = value[array[i]];
          } else {
            return null;
          }
        }
        return value;
      } else {
        return object[property];
      }
    }
  },
  /** Converts filters to Waterline syntax **/
  convertFilters: function (filters) {
    var filterObject = {};
    if (filters) {
      if (Object.prototype.toString.call(filters) === '[object Array]') {
        if (filters.length > 0) {
          for (var i = 0; i < filters.length; i++) {
            if (filters[i].filterType !== 'equalTo') {
              var filterProperty = {};
              filterProperty[this.convertFilterType(filters[i].filterType)] = filters[i].filterValue;
              filterObject[filters[i].filterProperty] = filterProperty;
            } else {
              filterObject[filters[i].filterProperty] = filters[i].filterValue;
            }
          }
          return filterObject;
        } else {
          return {};
        }
      } else {
        return {};
      }
    } else {
      return {};
    }
  },
  convertFilterType: function (filterType) {
    var propertyDictionary = new Array();
    propertyDictionary['greaterThan'] = '>';
    propertyDictionary['lessThan'] = '<';
    propertyDictionary['notEqualTo'] = '!';
    propertyDictionary['contains'] = 'contains';
    return propertyDictionary[filterType];
  },
  /** Converts filters from Waterline syntax to Firefly syntax **/
  convertFilterFromWaterline: function (filter) {
    if (typeof filter === 'string') {
      try {
        filter = JSON.parse(filter);
      } catch (err) {
        return [];
      }
    }
    var filters = [];
    try {
      for (var property in filter) {
        if (filter.hasOwnProperty(property)) {
          if (typeof filter[property] === 'object') {
            var obj = filter[property];
            if (obj['<']) {
              filters.push({
                filterType: 'lessThan',
                filterValue: obj['<'],
                filterProperty: property
              });
            } else if (obj['>']) {
              filters.push({
                filterType: 'greaterThan',
                filterValue: obj['>'],
                filterProperty: property
              });
            } else if (obj['!']) {
              filters.push({
                filterType: 'notEqualTo',
                filterValue: obj['!'],
                filterProperty: property
              });
            } else if (obj['contains']) {
              filters.push({
                filterType: 'contains',
                filterValue: obj['contains'],
                filterProperty: property
              });
            }
          } else {
            filters.push({
              filterType: 'equalTo',
              filterValue: filter[property],
              filterProperty: property
            });
          }
        }
      }
    } catch (err) {
      return [];
    }
    return filters;
  },
  getPropertyValue: function (object, propertyName) {
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (property === propertyName) {
          return object[property];
        }
      }
    }
  },
  splitSortAttrs: function (sort) {
    var array = sort.split(' ');
    return {
      sort: array[0],
      sortType: array[1]
    };
  },
  uniqueId: function () {
    return uuid.v4() + '-' + uuid.v1();
  }
};
