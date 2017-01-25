if (window.FC === undefined) { window.FC = {}; }

(() => {

  var dietData;

  window.FC.dietData = {

    getCatagories: function (user, diet) {
      var userVar = user;
      var dietVar = diet;

      if (dietVar.diets.length === 0) {

        this.callbacks.forEach((cb) => { cb(userVar, dietVar); })
      }
      else {

        var activeDiet;

        dietVar.diets.forEach((diet) => {
          if (diet.active === true) {
            activeDiet = diet.id;
          }

        });

        if (activeDiet === undefined) {
          this.callbacks.forEach((cb) => { cb(userVar, dietVar); })
        }
        else {
          $.ajax({
            url: "/api/catagory/" + activeDiet
          })
          .done((data) => {
            this.callbacks.forEach((cb) => { cb(userVar, dietVar, data); })
          })

        }

      }

    },

    getDiets: function(user) {
      var userVar = user;

      $.ajax({
        url: "/api/diet"
      })
      .done((data) => {
        this.getCatagories(user, data);
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
    },

    deleteDiet: function(diet) {
      $.ajax({
        url: "api/diet/" + diet,
        method: "DELETE"
      })
      .done((data) => {
        this.loadUser();
      });
    }

  }

})();
