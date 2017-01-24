if (window.FC === undefined) { window.FC = {}; }

(() => {

  var dietData;

  window.FC.dietData = {

    getDiets: function(user) {
      var userVar = user;

      $.ajax({
        url: "/api/diet"
      })
      .done((data) => {
        this.callbacks.forEach((cb) => { cb(data, user); });
      });
    },

    callbacks: [],

    loadUser: function() {
      $.ajax({
        url: "api/user"
      })
      .done((data) => {
        this.getDiets(data);
      })
    },

    registerCallback: function(cb) {
      this.callbacks.push(cb);
    }

  }

})();
