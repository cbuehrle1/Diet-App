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

      _this.state = { baseUri: "",
        results: [],
        form: true,
        offset: 1
      };
      _this.handleScroll = _this.handleScroll.bind(_this);
      return _this;
    }

    _createClass(RecipeSearchComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }
    }, {
      key: "handleScroll",
      value: function handleScroll() {
        var _this2 = this;

        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body;
        var html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        var windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {

          var queryStr = this.queryInput.value;
          var offsetAmt = this.state.offset;

          $.ajax({
            url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&offset=" + offsetAmt + "&query=" + queryStr,
            type: 'GET',
            beforeSend: function beforeSend(xhr) {
              xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
              xhr.setRequestHeader("Accept", "application/json");
            }
          }).done(function (data) {
            var concatRecipes = _this2.state.results.concat(data.results);

            _this2.setState({
              baseUri: data.baseUri,
              results: concatRecipes,
              form: false,
              offset: _this2.state.offset + 10
            });
          });
        }
      }
    }, {
      key: "callSearch",
      value: function callSearch(evt) {
        var _this3 = this;

        evt.preventDefault();
        var queryStr = this.queryInput.value;

        $.ajax({
          url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&offset=0&query=" + queryStr,
          type: 'GET',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
            xhr.setRequestHeader("Accept", "application/json");
          }
        }).done(function (data) {

          _this3.setState({
            baseUri: data.baseUri,
            results: data.results,
            form: false,
            offset: _this3.state.offset
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var searchForm;
        var searchResults;
        var imageUrl;

        if (this.state.form === true) {
          searchForm = React.createElement(
            "form",
            null,
            React.createElement("input", { ref: function ref(input) {
                _this4.queryInput = input;
              }, placeholder: "Search" }),
            React.createElement(
              "button",
              { onClick: function onClick(evt) {
                  _this4.callSearch(evt);
                } },
              "Search"
            )
          );
        } else if (this.state.form === false) {
          imageUrl = this.state.baseUri;
          searchForm = React.createElement(
            "form",
            null,
            React.createElement("input", { ref: function ref(input) {
                _this4.queryInput = input;
              }, placeholder: "Search" }),
            React.createElement(
              "button",
              { onClick: function onClick(evt) {
                  _this4.callSearch(evt);
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
              this.state.results.map(function (recipe) {
                return React.createElement(
                  "li",
                  { key: recipe.id },
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
