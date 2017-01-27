if (window.FC === undefined) { window.FC = {}; }

(() => {

  var storedInfo = {
    userInfo: {},
    dietInfo: {},
    catagoryInfo: {}
  }

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
            console.log('set category info', data);
            storedInfo.catagoryInfo = data;
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
        storedInfo.dietInfo = data;
        this.getCatagories(user, data);
      });

    },

    callbacks: [],
    recipeInfo: [],

    loadUser: function() {
      $.ajax({
        url: "api/user"
      })
      .done((data) => {
        storedInfo.userInfo = data;
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
    },

    storeRecipeInfo: function(data) {
      this.recipeInfo.push(data);
    },

    sendRecipeInfo: function() {

      console.log('send recipe info', storedInfo.catagoryInfo);
      var info = {
        catagoryInfo: storedInfo.catagoryInfo,
        recipeInfo: this.recipeInfo
      }

      return info;
    },

    getSavedRecipe: function(catagoryId, recipeId) {
      var detailedRecipeInfo;
      var selectedCatagory;
      console.log('getting saved category id', catagoryId);

        storedInfo.catagoryInfo.catagories.forEach((catagory) => {

          if (catagory.id === catagoryId) {

            selectedCatagory = catagory;
          }

        });

        selectedCatagory.recipes.forEach((recipe) => {

          if (recipe.id === recipeId) {
            detailedRecipeInfo = recipe
          }

        });

        return detailedRecipeInfo;
      }

    }

})();
