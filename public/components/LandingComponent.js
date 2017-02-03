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

      var _this = _possibleConstructorReturn(this, (LandingComponent.__proto__ || Object.getPrototypeOf(LandingComponent)).call(this));

      _this.state = { height: window.innerHeight - 36, display: false };
      return _this;
    }

    _createClass(LandingComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        FC.dietData.deleteCurrentSearch();

        var delay = function delay() {
          console.log("setTimeout");
          _this2.setState({
            height: _this2.state.height,
            display: true
          });
        };

        window.setTimeout(delay, 800);
      }
    }, {
      key: "render",
      value: function render() {
        var landingContent;
        if (this.state.display !== false) {
          landingContent = React.createElement(
            "div",
            { className: "vertical-alignment" },
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
                ReactRouter.Link,
                { to: "/CreateDiet" },
                "diet"
              )
            ),
            React.createElement(
              "h1",
              null,
              "Search for ",
              React.createElement(
                ReactRouter.Link,
                { to: "/RecipeSearch" },
                "recipes"
              )
            ),
            React.createElement(
              "h1",
              null,
              "Search for recipes by ",
              React.createElement(
                ReactRouter.Link,
                { to: "/NutrientsSearch" },
                "nutritional targets"
              )
            )
          );
        }
        return React.createElement(
          "div",
          { className: "content-container", style: { height: this.state.height } },
          landingContent
        );
      }
    }]);

    return LandingComponent;
  }(React.Component);

  FC.LandingComponent = LandingComponent;
})();
//# sourceMappingURL=LandingComponent.js.map
