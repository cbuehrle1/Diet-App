"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var SingleRecipeComponent = function (_React$Component) {
    _inherits(SingleRecipeComponent, _React$Component);

    function SingleRecipeComponent() {
      _classCallCheck(this, SingleRecipeComponent);

      var _this = _possibleConstructorReturn(this, (SingleRecipeComponent.__proto__ || Object.getPrototypeOf(SingleRecipeComponent)).call(this));

      _this.state = { showDelete: false };
      return _this;
    }

    _createClass(SingleRecipeComponent, [{
      key: "showDelete",
      value: function showDelete() {

        this.setState({
          showDelete: true
        });
      }
    }, {
      key: "hideDelete",
      value: function hideDelete() {

        this.setState({
          showDelete: false
        });
      }
    }, {
      key: "deleteRecipe",
      value: function deleteRecipe() {

        $.ajax({
          url: "/api/catagory/" + this.props.catagoryId + "/recipe/" + this.props.recipe.id,
          method: "POST",
          data: {
            id: this.props.recipe.id
          }
        }).done(function (data) {
          FC.dietData.loadUser();
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var deleteIcon;

        if (this.state.showDelete === true) {
          deleteIcon = React.createElement(
            "i",
            { onClick: function onClick() {
                _this2.deleteRecipe();
              }, className: "material-icons trash-can", style: { cursor: "pointer" } },
            "delete_forever"
          );
        }

        return React.createElement(
          "div",
          { onMouseOver: function onMouseOver() {
              _this2.showDelete();
            }, onMouseLeave: function onMouseLeave() {
              _this2.hideDelete();
            } },
          React.createElement(
            ReactRouter.Link,
            { title: this.props.recipe.name, key: this.props.id, to: "/catagory/" + this.props.catagoryId + "/recipe/" + this.props.recipe.id },
            React.createElement(
              "p",
              null,
              this.props.recipe.name
            )
          ),
          deleteIcon
        );
      }
    }]);

    return SingleRecipeComponent;
  }(React.Component);

  FC.SingleRecipeComponent = SingleRecipeComponent;
})();
//# sourceMappingURL=SingleRecipeComponent.js.map
