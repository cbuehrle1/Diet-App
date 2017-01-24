"use strict";

if (window.FC === undefined) {
  window.FC = {};
}

(function () {

  var dietData;

  window.FC.dietData = {

    getDiets: function getDiets(user) {
      var _this = this;

      var userVar = user;

      $.ajax({
        url: "/api/diet"
      }).done(function (data) {
        _this.callbacks.forEach(function (cb) {
          cb(data, user);
        });
      });
    },

    callbacks: [],

    loadUser: function loadUser() {
      var _this2 = this;

      $.ajax({
        url: "api/user"
      }).done(function (data) {
        _this2.getDiets(data);
      });
    },

    registerCallback: function registerCallback(cb) {
      this.callbacks.push(cb);
    }

  };
})();
//# sourceMappingURL=dietData.js.map
