"use strict";

if (window.FC === undefined) {
  window.FC = {};
}

(function () {

  var dietData;

  window.FC.dietData = {

    getDiets: function getDiets(cb, user) {
      var userVar = user;
      $.ajax({
        url: "/api/diet"
      }).done(function (data) {
        cb(data, userVar);
      });
    }

  };
})();
//# sourceMappingURL=dietData.js.map
