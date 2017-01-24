if (window.FC === undefined) { window.FC = {}; }

(() => {

  var dietData;

  window.FC.dietData = {

    getCatagories: function (user, diet) {
      var userVar = user;
      var dietVar = diet;
      console.log(dietVar);
      $.ajax({
        url: "/api/catagory/" + dietVar.diets[0].id
      })
      .done((data) => {
        this.callbacks.forEach((cb) => { cb(userVar, dietVar, data); })
      })
    },

    getDiets: function(user) {
      var userVar = user;

      $.ajax({
        url: "/api/diet"
      })
      .done((data) => {
        this.getCatagories(userVar, data);
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
