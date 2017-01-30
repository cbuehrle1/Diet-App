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

      return _possibleConstructorReturn(this, (DailyDietComponent.__proto__ || Object.getPrototypeOf(DailyDietComponent)).apply(this, arguments));
    }

    _createClass(DailyDietComponent, [{
      key: "pullDiets",
      value: function pullDiets() {
        return FC.dietData.getDietInfo();
      }
    }, {
      key: "render",
      value: function render() {
        var diets = FC.dietData.getDietInfo();
        console.log(diets);
        return React.createElement(
          "div",
          null,
          "Daily Diet Component"
        );
      }
    }]);

    return DailyDietComponent;
  }(React.Component);

  FC.DailyDietComponent = DailyDietComponent;
})();
//# sourceMappingURL=DailyDietComponent.js.map