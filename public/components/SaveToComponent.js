"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var SaveToComponent = function (_React$Component) {
    _inherits(SaveToComponent, _React$Component);

    function SaveToComponent() {
      _classCallCheck(this, SaveToComponent);

      var _this = _possibleConstructorReturn(this, (SaveToComponent.__proto__ || Object.getPrototypeOf(SaveToComponent)).call(this));

      _this.state = { info: { catagoryInfo: { catagories: [] }, recipeInfo: [] }, click: false };
      return _this;
    }

    _createClass(SaveToComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var cb = function cb() {
          var data = FC.dietData.sendRecipeInfo();
          console.log(data);

          _this2.setState({
            info: data,
            click: false
          });
        };

        FC.dietData.registerCallback(cb);
        FC.dietData.loadUser();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this3 = this;

        var cb = function cb() {
          var data = FC.dietData.sendRecipeInfo();

          _this3.setState({
            info: data,
            click: false
          });
        };

        FC.dietData.recipeInfo = [];
        FC.dietData.onUnmount(cb);
      }
    }, {
      key: "clicked",
      value: function clicked() {

        if (this.state.click === false) {
          this.setState({
            info: this.state.info,
            click: true
          });
        } else {
          this.setState({
            info: this.state.info,
            click: false
          });
        }
      }
    }, {
      key: "saveCatagory",
      value: function saveCatagory(evt) {
        console.log(this.state.info.recipeInfo[0]);
        var postData = {
          name: this.state.info.recipeInfo[0].title,
          servings: this.state.info.recipeInfo[0].servings,
          readyInMinutes: this.state.info.recipeInfo[0].readyInMinutes,
          image: this.state.info.recipeInfo[0].image,
          nutrients: this.state.info.recipeInfo[0].nutrition.nutrients,
          extendedIngredients: this.state.info.recipeInfo[0].extendedIngredients,
          analyzedInstructions: this.state.info.recipeInfo[0].analyzedInstructions
        };
        $.ajax({
          url: "/api/catagory/" + evt.target.id + "/recipe",
          method: "POST",
          data: JSON.stringify(postData),
          contentType: "application/json",
          dataType: "json"
        }).done(function (req, res) {
          FC.dietData.loadUser();
          ReactRouter.browserHistory.goBack();
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var dropDown;
        console.log("render", this.state.info.catagoryInfo.catagories);
        if (this.state.click === true) {
          dropDown = React.createElement(
            "ul",
            { ref: function ref(list) {
                _this4.cataList = list;
              }, className: "save-to-dropdown" },
            this.state.info.catagoryInfo.catagories.map(function (catagory, index) {
              return React.createElement(
                "li",
                { key: index, id: catagory.id, onClick: function onClick(evt) {
                    _this4.saveCatagory(evt);
                  } },
                catagory.name
              );
            })
          );
        }

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "save-to-button", onClick: function onClick() {
                _this4.clicked();
              } },
            "Save To ",
            React.createElement(
              "span",
              null,
              "\u25BC"
            )
          ),
          dropDown
        );
      }
    }]);

    return SaveToComponent;
  }(React.Component);

  FC.SaveToComponent = SaveToComponent;
})();
//# sourceMappingURL=SaveToComponent.js.map
