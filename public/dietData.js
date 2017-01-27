"use strict";

if (window.FC === undefined) {
  window.FC = {};
}

(function () {

  var storedInfo = {
    userInfo: {},
    dietInfo: {},
    catagoryInfo: {}
  };

  window.FC.dietData = {

    getCatagories: function getCatagories(user, diet) {
      var _this = this;

      var userVar = user;
      var dietVar = diet;

      if (dietVar.diets.length === 0) {

        this.callbacks.forEach(function (cb) {
          cb(userVar, dietVar);
        });
      } else {

        var activeDiet;

        dietVar.diets.forEach(function (diet) {
          if (diet.active === true) {
            activeDiet = diet.id;
          }
        });

        if (activeDiet === undefined) {
          this.callbacks.forEach(function (cb) {
            cb(userVar, dietVar);
          });
        } else {
          $.ajax({
            url: "/api/catagory/" + activeDiet
          }).done(function (data) {
            storedInfo.catagoryInfo = data;
            _this.callbacks.forEach(function (cb) {
              cb(userVar, dietVar, data);
            });
          });
        }
      }
    },

    getDiets: function getDiets(user) {
      var _this2 = this;

      var userVar = user;
      console.log(FC.dietData.recipeInfo);

      $.ajax({
        url: "/api/diet"
      }).done(function (data) {
        storedInfo.dietInfo = data;
        _this2.getCatagories(user, data);
      });
    },

    callbacks: [],
    recipeInfo: [],

    loadUser: function loadUser() {
      var _this3 = this;

      $.ajax({
        url: "api/user"
      }).done(function (data) {
        storedInfo.userInfo = data;
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
    },

    storeRecipeInfo: function storeRecipeInfo(data) {
      this.recipeInfo.push(data);
    },

    sendRecipeInfo: function sendRecipeInfo() {

      var info = {
        catagoryInfo: storedInfo.catagoryInfo,
        recipeInfo: this.recipeInfo
      };

      return info;
    },

    getSavedRecipe: function getSavedRecipe(catagoryId, recipeId) {
      var detailedRecipeInfo;
      var selectedCatagory;

      storedInfo.catagoryInfo.catagories.forEach(function (catagory) {

        if (catagory.id === catagoryId) {
          selectedCatagory = catagory;
        }
      });

      selectedCatagory.recipes.forEach(function (recipe) {

        if (recipe.id === recipeId) {
          detailedRecipeInfo = recipe;
        }
      });

      return detailedRecipeInfo;
    }

  };
})();
//# sourceMappingURL=dietData.js.map
