"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var NutrientsSearchComponent = function (_React$Component) {
    _inherits(NutrientsSearchComponent, _React$Component);

    function NutrientsSearchComponent() {
      _classCallCheck(this, NutrientsSearchComponent);

      var _this = _possibleConstructorReturn(this, (NutrientsSearchComponent.__proto__ || Object.getPrototypeOf(NutrientsSearchComponent)).call(this));

      _this.state = { form: true, advancedForm: false };
      return _this;
    }

    _createClass(NutrientsSearchComponent, [{
      key: "callSearch",
      value: function callSearch(evt) {
        var _this2 = this;

        evt.preventDefault();

        var queryStr = this.queryInput.value;
        var maxCalories = this.maxCalories.value;
        var maxFat = this.maxFat.value;
        var maxCarbs = this.maxCarbs.value;
        var maxProtein = this.maxProtein.value;

        $.ajax({
          url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false&maxCalories=" + maxCalories + "&maxCarbs=" + maxCarbs + "&maxFat=" + maxFat + "&maxProtein=" + maxProtein + "&number=10&offset=0&query=" + queryStr + "&ranking=1",
          type: 'GET',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
            xhr.setRequestHeader("Accept", "application/json");
          }
        }).done(function (data) {
          console.log(data.results);
          _this2.setState({
            form: false
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var searchForm;

        if (this.state.form === true) {
          searchForm = React.createElement(
            "form",
            { onSubmit: function onSubmit(evt) {
                _this3.callSearch(evt);
              } },
            React.createElement("input", { ref: function ref(input) {
                _this3.queryInput = input;
              }, placeholder: "Recipe Keyword" }),
            React.createElement("input", { ref: function ref(input) {
                _this3.maxCalories = input;
              }, placeholder: "Max Calories" }),
            React.createElement("input", { ref: function ref(input) {
                _this3.maxFat = input;
              }, placeholder: "Max Fat" }),
            React.createElement("input", { ref: function ref(input) {
                _this3.maxCarbs = input;
              }, placeholder: "Max Carbohydrates" }),
            React.createElement("input", { ref: function ref(input) {
                _this3.maxProtein = input;
              }, placeholder: "Max Protein" }),
            React.createElement(
              "button",
              null,
              "Search"
            )
          );
        } else {
          searchForm = React.createElement(
            "div",
            null,
            "Search Results"
          );
        }

        return React.createElement(
          "div",
          { className: "search-container" },
          React.createElement(
            "h1",
            null,
            "Nutrients Search Thing"
          ),
          searchForm
        );
      }
    }]);

    return NutrientsSearchComponent;
  }(React.Component);

  FC.NutrientsSearchComponent = NutrientsSearchComponent;
})();
//# sourceMappingURL=NutrientsSearchComponent.js.map
