'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var MealPlanComponent = function (_React$Component) {
    _inherits(MealPlanComponent, _React$Component);

    function MealPlanComponent() {
      _classCallCheck(this, MealPlanComponent);

      return _possibleConstructorReturn(this, (MealPlanComponent.__proto__ || Object.getPrototypeOf(MealPlanComponent)).apply(this, arguments));
    }

    _createClass(MealPlanComponent, [{
      key: 'render',
      value: function render() {
        console.log("Reached Meal Plan Component");
        return React.createElement(
          'div',
          { className: 'detail-container' },
          React.createElement(
            'h1',
            { className: 'react-detail-h1' },
            'Reached Meal Plan Component'
          )
        );
      }
    }]);

    return MealPlanComponent;
  }(React.Component);

  FC.MealPlanComponent = MealPlanComponent;
})();
//# sourceMappingURL=MealPlanComponent.js.map
