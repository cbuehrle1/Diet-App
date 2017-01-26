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

      _this.state = { data: { extendedIngredients: [] }, instructions: [] };
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

          FC.dietData.storeRecipeInfo(data);

          _this2.setState({
            data: data,
            instructions: data.analyzedInstructions[0].steps
          });
        });
      }
    }, {
      key: "render",
      value: function render() {

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
    }]);

    return RecipeDetailComponent;
  }(React.Component);

  FC.RecipeDetailComponent = RecipeDetailComponent;
})();
//# sourceMappingURL=RecipeDetailComponent.js.map
