"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var SavedRecipeComponent = function (_React$Component) {
    _inherits(SavedRecipeComponent, _React$Component);

    function SavedRecipeComponent() {
      _classCallCheck(this, SavedRecipeComponent);

      return _possibleConstructorReturn(this, (SavedRecipeComponent.__proto__ || Object.getPrototypeOf(SavedRecipeComponent)).call(this));
    }

    _createClass(SavedRecipeComponent, [{
      key: "render",
      value: function render() {
        console.log('rendering category', this.props.catagory);

        var catagoryId;
        return React.createElement(
          "ul",
          null,
          this.props.catagory.map(function (catagory, index) {
            catagoryId = catagory.id;
            return React.createElement(
              "li",
              { key: index },
              React.createElement(
                "h3",
                null,
                catagory.name
              ),
              catagory.recipes.map(function (recipe, index) {
                return React.createElement(
                  ReactRouter.Link,
                  { key: index, to: "/catagory/" + catagoryId + "/recipe/" + recipe.id },
                  React.createElement(
                    "p",
                    null,
                    recipe.name
                  )
                );
              })
            );
          })
        );
      }
    }]);

    return SavedRecipeComponent;
  }(React.Component);

  FC.SavedRecipeComponent = SavedRecipeComponent;
})();
//# sourceMappingURL=SavedRecipeComponent.js.map
