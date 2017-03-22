"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var DailyDietComponent = function (_React$Component) {
    _inherits(DailyDietComponent, _React$Component);

    function DailyDietComponent() {
      _classCallCheck(this, DailyDietComponent);

      var _this = _possibleConstructorReturn(this, (DailyDietComponent.__proto__ || Object.getPrototypeOf(DailyDietComponent)).call(this));

      _this.state = { diet: {} };
      return _this;
    }

    _createClass(DailyDietComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var cb = function cb(noop, diets, noop2) {

          var active;

          diets.diets.forEach(function (diet) {
            if (diet.active) {
              active = diet;
            }
          });
          console.log(active);
          _this2.setState({
            diet: active
          });
        };

        FC.dietData.registerCallback(cb);
      }
    }, {
      key: "render",
      value: function render() {

        var display;

        if (this.props.show) {
          display = React.createElement(
            "div",
            null,
            React.createElement(
              "ul",
              null,
              React.createElement(
                "li",
                null,
                this.state.diet.diet
              ),
              React.createElement(
                "li",
                null,
                "Calories: " + this.state.diet.calories
              ),
              React.createElement(
                "li",
                null,
                "Fat: " + this.state.diet.fat
              ),
              React.createElement(
                "li",
                null,
                'Carbs: ' + this.state.diet.carbs
              ),
              React.createElement(
                "li",
                null,
                'Protein: ' + this.state.diet.protein
              )
            )
          );
        }

        return React.createElement(
          "div",
          { className: "fixed-diet-window" },
          display
        );
      }
    }]);

    return DailyDietComponent;
  }(React.Component);

  FC.DailyDietComponent = DailyDietComponent;
})();
//# sourceMappingURL=DailyDietComponent.js.map
