"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var CreateDietComponent = function (_React$Component) {
    _inherits(CreateDietComponent, _React$Component);

    function CreateDietComponent() {
      _classCallCheck(this, CreateDietComponent);

      return _possibleConstructorReturn(this, (CreateDietComponent.__proto__ || Object.getPrototypeOf(CreateDietComponent)).apply(this, arguments));
    }

    _createClass(CreateDietComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        FC.dietData.deleteCurrentSearch();
      }
    }, {
      key: "saveDiet",
      value: function saveDiet(evt) {
        evt.preventDefault();

        $.ajax({
          url: "/api/diet",
          method: "POST",
          data: {
            diet: this.dietName.value,
            calories: this.calories.value,
            fats: this.fats.value,
            carbs: this.carbs.value,
            protein: this.protein.value
          }
        }).done(function (data) {
          FC.dietData.loadUser();
          ReactRouter.browserHistory.goBack();
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement(
          "div",
          { className: "search-container" },
          React.createElement(
            "h1",
            { className: "react-form-h1" },
            "Create a Diet"
          ),
          React.createElement(
            "form",
            { className: "react-form", onSubmit: function onSubmit(evt) {
                _this2.saveDiet(evt);
              } },
            React.createElement("input", { ref: function ref(input) {
                _this2.dietName = input;
              }, placeholder: "Diet Name" }),
            React.createElement("input", { ref: function ref(input) {
                _this2.calories = input;
              }, placeholder: "Target Calorie Count" }),
            React.createElement("input", { ref: function ref(input) {
                _this2.fats = input;
              }, placeholder: "Target Fat Count" }),
            React.createElement("input", { ref: function ref(input) {
                _this2.carbs = input;
              }, placeholder: "Target Carb Count" }),
            React.createElement("input", { ref: function ref(input) {
                _this2.protein = input;
              }, placeholder: "Target Protein Count" }),
            React.createElement(
              "button",
              null,
              "Create Diet"
            )
          )
        );
      }
    }]);

    return CreateDietComponent;
  }(React.Component);

  FC.CreateDietComponent = CreateDietComponent;
})();
//# sourceMappingURL=CreateDietComponent.js.map
