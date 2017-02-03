if (window.FC === undefined) { window.FC = {}; }

(() => {

  var storedInfo = {
    userInfo: {},
    dietInfo: {},
    catagoryInfo: {}
  }

  var currentSearchInfo = []
  var queryStr;
  var offset;
  var baseUri;

  var currentNutrientSearchInfo = []
  var paramObj;
  var nutQueryStr;
  var nutOffset;


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

      getDietInfo: function () {
        return storedInfo.dietInfo;
      },

      onUnmount: function(toRemove) {

        this.callbacks.forEach((callback, index) => {

          if (toRemove === callback) {
            this.callbacks.splice(index - 1, 1);
          }

        });


      },

      storeCurrentSearch: function(results, query, offsetNum, link) {

        queryStr = query;
        offset = offsetNum;
        baseUri = link;
        currentSearchInfo.push(results);

      },

      deleteCurrentSearch: function() {
        currentSearchInfo = []
        queryStr;
        offset;
        baseUri;
      },

      getCurrentSearch: function() {

        var sendObj = {
          query: queryStr,
          offSet: offset,
          base: baseUri
        }

        if (currentSearchInfo.length > 0) {

          var searchArrConcat = []

          currentSearchInfo.forEach( (arr, index) => {
            searchArrConcat = searchArrConcat.concat(arr)
          });
          sendObj.data = searchArrConcat;
          return sendObj;
        }
        else {
          sendObj.data = currentSearchInfo[0]
          return sendObj;
        }

      },

      storeCurrentNutrientSearch: function(params, results, query, offsetNum) {
        paramObj = params;
        nutQueryStr = query;
        nutOffset = offsetNum;
        currentNutrientSearchInfo.push(results);
      },

      deleteCurrentNutrientSearch() {
        paramObj;
        nutQueryStr;
        nutOffset;
        currentNutrientSearchInfo = []
      },

      getCurrentNutrientSearch() {

        var sendObj = {
          query: nutQueryStr,
          offset: nutOffset,
          params: paramObj
        }

        console.log(sendObj.offset)

        if (currentNutrientSearchInfo.length > 0) {

          var searchArrConcat = []

          currentNutrientSearchInfo.forEach( (arr, index) => {
            searchArrConcat = searchArrConcat.concat(arr)
          });
          sendObj.data = searchArrConcat;
          return sendObj;
        }
        else {
          sendObj.data = currentSearchInfo[0]
          return sendObj;
        }

      }

    }

})();
