"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var RecipeSearchComponent = function (_React$Component) {
    _inherits(RecipeSearchComponent, _React$Component);

    function RecipeSearchComponent() {
      _classCallCheck(this, RecipeSearchComponent);

      return _possibleConstructorReturn(this, (RecipeSearchComponent.__proto__ || Object.getPrototypeOf(RecipeSearchComponent)).apply(this, arguments));
    }

    _createClass(RecipeSearchComponent, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          "Recipe Search Thing"
        );
      }
    }]);

    return RecipeSearchComponent;
  }(React.Component);

  FC.RecipeSearchComponent = RecipeSearchComponent;
})();
//# sourceMappingURL=RecipeSearchComponent.js.map
