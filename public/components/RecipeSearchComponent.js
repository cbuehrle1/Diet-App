"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var RecipeSearchComponent = function (_React$Component) {
    _inherits(RecipeSearchComponent, _React$Component);

    function RecipeSearchComponent() {
      _classCallCheck(this, RecipeSearchComponent);

      var _this = _possibleConstructorReturn(this, (RecipeSearchComponent.__proto__ || Object.getPrototypeOf(RecipeSearchComponent)).call(this));

      _this.state = { data: {
          results: []
        }, form: true };
      return _this;
    }

    _createClass(RecipeSearchComponent, [{
      key: "callSearch",
      value: function callSearch(evt) {
        var _this2 = this;

        evt.preventDefault();
        var queryStr = this.queryInput.value;
        console.log(this.queryInput.value);
        $.ajax({
          url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&offset=0&query=" + queryStr + "&ranking=1&type=main+course",
          type: 'GET',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
            xhr.setRequestHeader("Accept", "application/json");
          }
        }).done(function (data) {

          _this2.setState({
            data: data,
            form: false
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        console.log(this.state.data);
        var searchForm;
        var searchResults;
        var imageUrl;

        if (this.state.form === true) {
          searchForm = React.createElement(
            "form",
            null,
            React.createElement("input", { ref: function ref(input) {
                _this3.queryInput = input;
              }, placeholder: "Search" }),
            React.createElement(
              "button",
              { onClick: function onClick(evt) {
                  _this3.callSearch(evt);
                } },
              "Search"
            )
          );
        } else if (this.state.form === false) {
          imageUrl = this.state.data.baseUri;
          searchForm = React.createElement(
            "form",
            null,
            React.createElement("input", { ref: function ref(input) {
                _this3.queryInput = input;
              }, placeholder: "Search" }),
            React.createElement(
              "button",
              { onClick: function onClick(evt) {
                  _this3.callSearch(evt);
                } },
              "Search"
            )
          );
          searchResults = React.createElement(
            "div",
            null,
            React.createElement(
              "h1",
              null,
              "Search results for \"",
              this.queryInput.value,
              "\""
            ),
            React.createElement(
              "ul",
              { className: "search-results" },
              this.state.data.results.map(function (recipe) {
                return React.createElement(
                  "li",
                  null,
                  React.createElement("img", { src: imageUrl + recipe.image }),
                  React.createElement(
                    "p",
                    null,
                    recipe.title
                  ),
                  React.createElement(
                    "p",
                    null,
                    "Ready in ",
                    recipe.readyInMinutes,
                    " minutes"
                  )
                );
              })
            )
          );
        }

        return React.createElement(
          "div",
          { className: "search-container" },
          searchForm,
          searchResults
        );
      }
    }]);

    return RecipeSearchComponent;
  }(React.Component);

  FC.RecipeSearchComponent = RecipeSearchComponent;
})();
//# sourceMappingURL=RecipeSearchComponent.js.map
