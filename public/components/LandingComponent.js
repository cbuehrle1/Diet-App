"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var LandingComponent = function (_React$Component) {
    _inherits(LandingComponent, _React$Component);

    function LandingComponent() {
      _classCallCheck(this, LandingComponent);

      return _possibleConstructorReturn(this, (LandingComponent.__proto__ || Object.getPrototypeOf(LandingComponent)).apply(this, arguments));
    }

    _createClass(LandingComponent, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "content-container" },
          React.createElement(
            "h1",
            null,
            "What would you like to do?"
          ),
          React.createElement(
            "h1",
            null,
            "Create a ",
            React.createElement(
              "a",
              { href: "" },
              "diet"
            )
          ),
          React.createElement(
            "h1",
            null,
            "Search for ",
            React.createElement(
              "a",
              { href: "" },
              "recipies"
            )
          ),
          React.createElement(
            "h1",
            null,
            "Search for recipes by nutritional targets"
          )
        );
      }
    }]);

    return LandingComponent;
  }(React.Component);

  FC.LandingComponent = LandingComponent;
})();
//# sourceMappingURL=LandingComponent.js.map
