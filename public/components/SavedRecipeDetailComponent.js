"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var SavedRecipeDetailComponent = function (_React$Component) {
    _inherits(SavedRecipeDetailComponent, _React$Component);

    function SavedRecipeDetailComponent() {
      _classCallCheck(this, SavedRecipeDetailComponent);

      var _this = _possibleConstructorReturn(this, (SavedRecipeDetailComponent.__proto__ || Object.getPrototypeOf(SavedRecipeDetailComponent)).call(this));

      _this.state = { recipe: { analyzedInstructions: [],
          extendedIngredients: [], nutrients: [] }, diets: { diets: [] } };
      return _this;
    }

    _createClass(SavedRecipeDetailComponent, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps() {

        var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);
        var diets = FC.dietData.getDietInfo();

        this.setState({
          recipe: recipe,
          diets: diets
        });
      }
    }, {
      key: "findNutrients",
      value: function findNutrients(item, itemTwo, itemThree, itemFour) {

        var nutrientsArray = [];

        this.state.recipe.nutrients.map(function (nutrient) {

          if (nutrient.title.indexOf(item) !== -1) {
            nutrientsArray.push(nutrient);
          } else if (nutrient.title === itemTwo) {
            nutrientsArray.push(nutrient);
          } else if (nutrient.title.indexOf(itemThree) !== -1) {
            nutrientsArray.push(nutrient);
          } else if (nutrient.title.indexOf(itemFour) !== -1) {
            nutrientsArray.push(nutrient);
          }
        });

        return nutrientsArray;
      }
    }, {
      key: "findActiveDiet",
      value: function findActiveDiet() {
        var activeDiet = {};
        var dailyValueArray = [];
        this.state.diets.diets.map(function (diet) {
          if (diet.active === true) {
            activeDiet = diet;
          }
        });

        dailyValueArray.push(activeDiet.calories);
        dailyValueArray.push(activeDiet.fat);
        dailyValueArray.push(activeDiet.carbs);
        dailyValueArray.push(activeDiet.protein);

        return dailyValueArray;
      }
    }, {
      key: "render",
      value: function render() {

        var diet = this.findActiveDiet();
        var nutrients = this.findNutrients("Calories", "Fat", "Carbohydrates", "Protein");
        var percents = [];

        for (var i = 0; i < nutrients.length; i++) {

          var item = {
            title: "",
            percent: nutrients[i].amount / diet[i] * 100
          };
          percents.push(item);
        }

        if (percents[0] !== undefined) {

          percents[0].title = "Calories";
          percents[1].title = "Fat";
          percents[2].title = "Carbohydrates";
          percents[3].title = "Protein";
        }

        return React.createElement(
          "div",
          { className: "search-container" },
          React.createElement(
            "h1",
            null,
            this.state.recipe.name
          ),
          React.createElement("img", { className: "detail-img", src: this.state.recipe.image }),
          React.createElement(
            "h2",
            null,
            "Servings: ",
            this.state.recipe.servings
          ),
          React.createElement(
            "h2",
            null,
            "Ready in ",
            this.state.recipe.readyInMinutes,
            " minutes"
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              null,
              "Nutritional Information"
            ),
            React.createElement(
              "ul",
              null,
              nutrients.map(function (nutrient, index) {
                return React.createElement(
                  "li",
                  { key: index },
                  nutrient.title + ": " + nutrient.amount + " " + nutrient.unit
                );
              })
            ),
            React.createElement(
              "h2",
              null,
              "Percent of Daily Diet"
            ),
            React.createElement(
              "ul",
              null,
              percents.map(function (nutrient, index) {
                return React.createElement(
                  "li",
                  { key: index },
                  nutrient.title + ": " + nutrient.percent.toFixed(1) + "%"
                );
              })
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "h1",
              null,
              "ingredients"
            ),
            React.createElement(
              "ul",
              { className: "search-results" },
              this.state.recipe.extendedIngredients.map(function (ingredient, index) {
                return React.createElement(
                  "li",
                  { key: index },
                  ingredient.originalString
                );
              })
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "h1",
              null,
              "Instructions"
            ),
            this.state.recipe.analyzedInstructions.map(function (recipe, index) {
              return React.createElement(
                "ul",
                { className: "search-results", key: index },
                recipe.steps.map(function (step, index) {
                  return React.createElement(
                    "li",
                    { key: index },
                    step.step
                  );
                })
              );
            })
          )
        );
      }
    }]);

    return SavedRecipeDetailComponent;
  }(React.Component);

  FC.SavedRecipeDetailComponent = SavedRecipeDetailComponent;
})();
//# sourceMappingURL=SavedRecipeDetailComponent.js.map
