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

  var currentSearchInfo = [];
  var queryStr;
  var offset;
  var baseUri;

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

      //BUG: This is a workaround for componentWillReceiveProps on SavedRecipeDetailComponent firing
      //  twice, first with old data. Find real fix.
      if (selectedCatagory === undefined) {

        return storedInfo.catagoryInfo.catagories[0].recipes[0];
      }

      selectedCatagory.recipes.forEach(function (recipe) {

        if (recipe.id === recipeId) {
          detailedRecipeInfo = recipe;
        }
      });

      return detailedRecipeInfo;
    },

    getDietInfo: function getDietInfo() {
      return storedInfo.dietInfo;
    },

    onUnmount: function onUnmount(toRemove) {
      var _this5 = this;

      this.callbacks.forEach(function (callback, index) {

        if (toRemove === callback) {
          _this5.callbacks.splice(index - 1, 1);
        }
      });
    },

    storeCurrentSearch: function storeCurrentSearch(results, query, offsetNum, baseUri) {

      queryStr = query;
      offset = offsetNum;
      baseUri = baseUri;
      currentSearchInfo.push(results);
    },

    deleteCurrentSearch: function deleteCurrentSearch() {
      currentSearchInfo = [];
      queryStr;
      offset;
      baseUri;
    },

    getCurrentSearch: function getCurrentSearch() {

      console.log(baseUri);

      var sendObj = {
        query: queryStr,
        offSet: offset,
        baseUri: baseUri
      };

      if (currentSearchInfo.length > 0) {

        var searchArrConcat = [];

        currentSearchInfo.forEach(function (arr, index) {
          searchArrConcat = searchArrConcat.concat(arr);
          console.log(arr.length, searchArrConcat.length);
        });
        sendObj.data = searchArrConcat;
        return sendObj;
      } else {
        sendObj.data = currentSearchInfo[0];
        return sendObj;
      }
    }

  };
})();
//# sourceMappingURL=dietData.js.map
