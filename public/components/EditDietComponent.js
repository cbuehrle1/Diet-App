"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var EditDietComponent = function (_React$Component) {
    _inherits(EditDietComponent, _React$Component);

    function EditDietComponent() {
      _classCallCheck(this, EditDietComponent);

      var _this = _possibleConstructorReturn(this, (EditDietComponent.__proto__ || Object.getPrototypeOf(EditDietComponent)).call(this));

      _this.state = { diet: { diet: [] } };
      return _this;
    }

    _createClass(EditDietComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var cb = function cb(data) {
          _this2.setState({
            diet: data
          });
        };

        $.ajax({
          url: "/api/diet/" + this.props.params.dietId
        }).done(function (data) {
          cb(data);
        });
      }
    }, {
      key: "editDiet",
      value: function editDiet(evt) {

        evt.preventDefault();

        $.ajax({
          url: "/api/diet/" + this.props.params.dietId,
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
        var _this3 = this;

        console.log(this.state.diet.diet);
        return React.createElement(
          "div",
          { className: "search-container" },
          React.createElement(
            "h1",
            null,
            "Edit Diet Component"
          ),
          this.state.diet.diet.map(function (diet, index) {
            return React.createElement(
              "form",
              { key: index, className: "update-diet", onSubmit: function onSubmit(evt) {
                  _this3.editDiet(evt);
                } },
              React.createElement("input", { ref: function ref(input) {
                  _this3.dietName = input;
                }, defaultValue: diet.name }),
              React.createElement("input", { ref: function ref(input) {
                  _this3.calories = input;
                }, defaultValue: diet.calories }),
              React.createElement("input", { ref: function ref(input) {
                  _this3.fats = input;
                }, defaultValue: diet.fat }),
              React.createElement("input", { ref: function ref(input) {
                  _this3.carbs = input;
                }, defaultValue: diet.carbohydrates }),
              React.createElement("input", { ref: function ref(input) {
                  _this3.protein = input;
                }, defaultValue: diet.protein }),
              React.createElement(
                "button",
                null,
                "Save Changes"
              )
            );
          })
        );
      }
    }]);

    return EditDietComponent;
  }(React.Component);

  FC.EditDietComponent = EditDietComponent;
})();
//# sourceMappingURL=EditDietComponent.js.map
