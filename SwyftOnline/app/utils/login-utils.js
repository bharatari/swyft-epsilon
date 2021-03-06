/* jslint unused: false */
import Ember from 'ember';
import config from 'swyft-epsilon-online/config/environment';

export default {
  localStorageKey: 'firefly_session',
  getToken() {
    return JSON.parse(localStorage.getItem(this.localStorageKey)).token.token;
  },
  getTokenId() {
    return JSON.parse(localStorage.getItem(this.localStorageKey)).token.id;
  },
  checkLogin() {
    const key = this.localStorageKey;
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (JSON.parse(localStorage.getItem(key))) {
        const url = config.routeLocation + '/api/isAuthenticated';
        const data = { tokenId: JSON.parse(localStorage.getItem(key)).token.id };
        Ember.$.ajax({
          url,
          data,
          success() {
            resolve(true);
          },
          error(xhr) {
            // There's an irrelevant syntax error
            // jQuery throws that has no effect on
            // our request. We need to handle this.
            if (xhr.responseText === 'OK') {
              resolve(true);
            } else {
              reject(false);
            }
          },
        });
      } else {
        reject(false);
      }
    });
  },
  logout() {
    const key = this.localStorageKey;
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (JSON.parse(localStorage.getItem(key))) {
        const url = config.routeLocation + '/api/logout';
        const data = { userId: JSON.parse(localStorage.getItem(key)).user.id };
        Ember.$.ajax({
          url,
          type: 'POST',
          data: JSON.stringify(data),
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
          },
          success() {
            // localStorage.removeItem(key);
            // Resetting everything on logout
            // makes it much more effective at
            // solving any runtime errors that a
            // user may encounter (with the cart, their user session etc.)
            // Resetting on logout also totally works
            // with our app flow so it's not going to cause issues either
            localStorage.clear();
            resolve(true);
          },
          error(xhr) {
            // There's an irrelevant syntax error jQuery throws
            // that has no effect on our request. We need to handle this.
            if (xhr.responseText === 'OK') {
              localStorage.removeItem(key);
              resolve(true);
            } else {
              reject(false);
            }
          },
        });
      } else {
        resolve(true);
      }
    });
  },
  isAdmin() {
    const key = this.localStorageKey;
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (JSON.parse(localStorage.getItem(key))) {
        const url = config.routeLocation + '/api/isAdmin';
        const data = { tokenId: JSON.parse(localStorage.getItem(key)).token.id };
        Ember.$.ajax({
          url,
          data,
          success() {
            resolve(true);
          },
          error(xhr) {
            // There's an irrelevant syntax error jQuery throws
            // that has no effect on our request. We need to handle this.
            if (xhr.responseText === 'OK') {
              resolve(true);
            } else {
              reject(false);
            }
          },
        });
      } else {
        reject(false);
      }
    });
  },
  isDelivery() {
    const key = this.localStorageKey;
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (JSON.parse(localStorage.getItem(key))) {
        const url = config.routeLocation + '/api/isDelivery';
        const data = { tokenId: JSON.parse(localStorage.getItem(key)).token.id };
        Ember.$.ajax({
          url,
          data,
          success() {
            resolve(true);
          },
          error(xhr) {
            // There's an irrelevant syntax error jQuery throws
            // that has no effect on our request. We need to handle this.
            if (xhr.responseText === 'OK') {
              resolve(true);
            } else {
              reject(false);
            }
          },
        });
      } else {
        reject(false);
      }
    });
  },
  checkLocalStorage() {
    try {
      localStorage.setItem('localStorageTest-E9FJSNWN209DS0AM2', 'E9FJSNWN209DS0AM2');
      localStorage.removeItem('localStorageTest-E9FJSNWN209DS0AM2');
      return true;
    } catch (e) {
      return false;
    }
  },
  getLogin() {
    if (JSON.parse(localStorage.getItem(this.localStorageKey))) {
      return {
        token: JSON.parse(localStorage.getItem(this.localStorageKey)).token.token,
        tokenId: JSON.parse(localStorage.getItem(this.localStorageKey)).token.id,
      };
    }
    return {};
  },
  localStorageAlert: 'We\'re having trouble processing your request. ' +
    'It seems you\'re using Safari in Private Mode or an older, unsupported browser. ' +
    'Please disable Private Mode on Safari or use another compatible browser in order to continue.',
};
