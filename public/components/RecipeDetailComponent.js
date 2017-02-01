"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var RecipeDetailComponent = function (_React$Component) {
    _inherits(RecipeDetailComponent, _React$Component);

    function RecipeDetailComponent() {
      _classCallCheck(this, RecipeDetailComponent);

      var _this = _possibleConstructorReturn(this, (RecipeDetailComponent.__proto__ || Object.getPrototypeOf(RecipeDetailComponent)).call(this));

      _this.state = { data: { extendedIngredients: [] }, instructions: [], nutrients: [], diet: {} };
      return _this;
    }

    _createClass(RecipeDetailComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        $.ajax({
          url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + this.props.params.recipeId + "/information?includeNutrition=true",
          type: 'GET',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
            xhr.setRequestHeader("Accept", "application/json");
          }
        }).done(function (data) {
          console.log(data);
          FC.dietData.storeRecipeInfo(data);
          var diets = FC.dietData.getDietInfo();
          var activeDiet = {};

          diets.diets.map(function (diet) {
            if (diet.active === true) {
              activeDiet = diet;
            }
          });

          var instructions;

          if (data.analyzedInstructions.length === 0) {
            instructions = data.instructions;
          } else {
            instructions = data.analyzedInstructions[0].steps;
          }

          _this2.setState({
            data: data,
            instructions: instructions,
            nutrients: data.nutrition.nutrients,
            diet: activeDiet
          });
        });
      }
    }, {
      key: "findNutrients",
      value: function findNutrients(item, itemTwo, itemThree, itemFour) {

        var nutrientsArray = [];

        this.state.nutrients.map(function (nutrient) {

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
      key: "render",
      value: function render() {

        var nutrientsArray = this.findNutrients("Calories", "Fat", "Carbohydrates", "Protein");

        var instructions;
        console.log(this.state.instructions);
        if (typeof this.state.instructions === "string") {
          instructions = React.createElement(
            "p",
            null,
            this.state.instructions
          );
        } else if (this.state.instructions === null) {
          instructions;
        } else {
          instructions = React.createElement(
            "div",
            null,
            React.createElement(
              "h1",
              null,
              "instructions"
            ),
            React.createElement(
              "ol",
              { className: "search-results" },
              this.state.instructions.map(function (step, index) {
                return React.createElement(
                  "li",
                  { key: index },
                  step.step
                );
              })
            )
          );
        }

        return React.createElement(
          "div",
          { className: "search-container" },
          React.createElement(FC.SaveToComponent, { data: this.state.data }),
          React.createElement(
            "h1",
            null,
            this.state.data.title
          ),
          React.createElement("img", { className: "detail-img", src: this.state.data.image }),
          React.createElement(
            "h1",
            null,
            "Nutrition Per Serving"
          ),
          React.createElement(
            "ul",
            null,
            nutrientsArray.map(function (nutrient, index) {
              return React.createElement(
                "li",
                { key: index },
                nutrient.title + ": " + nutrient.amount + " " + nutrient.unit
              );
            })
          ),
          React.createElement(
            "h1",
            null,
            "ingredients"
          ),
          React.createElement(
            "ul",
            { className: "search-results" },
            this.state.data.extendedIngredients.map(function (ingredient, index) {
              return React.createElement(
                "li",
                { key: index },
                ingredient.originalString
              );
            })
          ),
          instructions
        );
      }
    }]);

    return RecipeDetailComponent;
  }(React.Component);

  FC.RecipeDetailComponent = RecipeDetailComponent;
})();
//# sourceMappingURL=RecipeDetailComponent.js.map
