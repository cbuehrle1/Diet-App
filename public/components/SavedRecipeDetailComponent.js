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
          extendedIngredients: [], nutrients: [] } };
      return _this;
    }

    _createClass(SavedRecipeDetailComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);

        this.setState({
          recipe: recipe
        });
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps() {
        var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);

        this.setState({
          recipe: recipe
        });
      }
    }, {
      key: "render",
      value: function render() {
        console.log(this.state.recipe);
        return React.createElement(
          "div",
          { className: "search-container" },
          "Reached Saved Recipe Detail Page"
        );
      }
    }]);

    return SavedRecipeDetailComponent;
  }(React.Component);

  FC.SavedRecipeDetailComponent = SavedRecipeDetailComponent;
})();
//# sourceMappingURL=SavedRecipeDetailComponent.js.map
