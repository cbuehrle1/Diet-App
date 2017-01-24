"use strict";

if (window.FC === undefined) {
  window.FC = {};
}

(function () {

  var dietData;

  window.FC.dietData = {

    getCatagories: function getCatagories(user, diet) {
      var _this = this;

      var userVar = user;
      var dietVar = diet;
      console.log(dietVar);
      $.ajax({
        url: "/api/catagory/" + dietVar.diets[0].id
      }).done(function (data) {
        _this.callbacks.forEach(function (cb) {
          cb(userVar, dietVar, data);
        });
      });
    },

    getDiets: function getDiets(user) {
      var _this2 = this;

      var userVar = user;

      $.ajax({
        url: "/api/diet"
      }).done(function (data) {
        _this2.getCatagories(userVar, data);
      });
    },

    callbacks: [],

    loadUser: function loadUser() {
      var _this3 = this;

      $.ajax({
        url: "api/user"
      }).done(function (data) {
        _this3.getDiets(data);
      });
    },

    registerCallback: function registerCallback(cb) {
      this.callbacks.push(cb);
    },

    deleteDiet: function deleteDiet(diet) {
      var _this4 = this;

      $.ajax({
        url: "api/diet/" + diet,
        method: "DELETE"
      }).done(function (data) {
        _this4.loadUser();
      });
    }

  };
})();
//# sourceMappingURL=dietData.js.map
