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

      var info = {
        catagoryInfo: storedInfo.catagoryInfo,
        recipeInfo: this.recipeInfo
      }

      return info;
    },

    getSavedRecipe: function(catagoryId, recipeId) {
      var detailedRecipeInfo;
      var selectedCatagory;
      console.log(storedInfo.dietInfo);
        storedInfo.catagoryInfo.catagories.forEach((catagory) => {

          if (catagory.id === catagoryId) {

            selectedCatagory = catagory;
          }

        });

        //BUG: This is a workaround for componentWillReceiveProps on SavedRecipeDetailComponent firing
        //  twice, first with old data. Find real fix.
        if (selectedCatagory === undefined) {

          return storedInfo.catagoryInfo.catagories[0].recipes[0];
        }

        selectedCatagory.recipes.forEach((recipe) => {

          if (recipe.id === recipeId) {
            detailedRecipeInfo = recipe
          }

        });

        return detailedRecipeInfo;
      },

      getDietInfo() {
        return storedInfo.dietInfo;
      }

    }

})();
