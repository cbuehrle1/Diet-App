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

      _this.state = { form: true, results: [], offset: 0, searchParams: {}, query: "" };
      _this.handleScroll = _this.handleScroll.bind(_this);
      return _this;
    }

    _createClass(NutrientsSearchComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        FC.dietData.deleteCurrentSearch();
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

          var queryStr = this.state.searchParams.queryStr;
          var offsetAmt = this.state.offset;
          var maxCalories = this.state.searchParams.maxCalories;
          var maxFat = this.state.searchParams.maxFat;
          var maxCarbs = this.state.searchParams.maxCarbs;
          var maxProtein = this.state.searchParams.maxProtein;

          $.ajax({
            url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false" + maxCalories + maxCarbs + maxFat + maxProtein + "&number=10&offset=" + offsetAmt + queryStr + "&ranking=1",
            type: 'GET',
            beforeSend: function beforeSend(xhr) {
              xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
              xhr.setRequestHeader("Accept", "application/json");
            }
          }).done(function (data) {
            var concatRecipes = _this2.state.results.concat(data.results);

            _this2.setState({
              form: false,
              results: concatRecipes,
              offset: _this2.state.offset + 10,
              searchParams: _this2.state.searchParams
            });
          });
        }
      }
    }, {
      key: "validateSearchParams",
      value: function validateSearchParams(string, value) {

        if (value === "") {
          return "";
        } else {
          return string + value;
        }
      }
    }, {
      key: "callSearch",
      value: function callSearch(evt) {
        var _this3 = this;

        evt.preventDefault();
        var offsetAmt = "&offset=" + this.state.offset;
        var queryStr = this.validateSearchParams("&query=", this.queryInput.value);
        var maxCalories = this.validateSearchParams("&maxCalories=", this.maxCalories.value);
        var maxFat = this.validateSearchParams("&maxFat=", this.maxFat.value);
        var maxCarbs = this.validateSearchParams("&maxCarbs=", this.maxCarbs.value);
        var maxProtein = this.validateSearchParams("&maxProtein=", this.maxProtein.value);
        console.log("making ajax call");

        $.ajax({
          url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false" + maxCalories + maxCarbs + maxFat + maxProtein + "&number=10" + offsetAmt + queryStr + "&ranking=1",
          type: 'GET',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
            xhr.setRequestHeader("Accept", "application/json");
          }
        }).done(function (data) {

          var params = {
            queryStr: queryStr,
            maxCalories: maxCalories,
            maxFat: maxFat,
            maxCarbs: maxCarbs,
            maxProtein: maxProtein
          };

          FC.dietData.storeCurrentNutrientSearch(params, data.results, _this3.queryInput.value, _this3.state.offset);

          _this3.setState({
            form: false,
            results: data.results,
            offset: _this3.state.offset + 10,
            searchParams: params,
            query: _this3.queryInput.value
          });
          console.log(data);
        });
      }
    }, {
      key: "backToSearch",
      value: function backToSearch() {
        this.setState({
          form: true,
          searchParams: {},
          query: "",
          offset: 0
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var searchForm;
        var searchResults;

        if (this.state.form === true) {
          searchForm = React.createElement(
            "form",
            { onSubmit: function onSubmit(evt) {
                _this4.callSearch(evt);
              } },
            React.createElement("input", { ref: function ref(input) {
                _this4.queryInput = input;
              }, placeholder: "Recipe Keyword" }),
            React.createElement("input", { ref: function ref(input) {
                _this4.maxCalories = input;
              }, placeholder: "Max Calories" }),
            React.createElement("input", { ref: function ref(input) {
                _this4.maxFat = input;
              }, placeholder: "Max Fat" }),
            React.createElement("input", { ref: function ref(input) {
                _this4.maxCarbs = input;
              }, placeholder: "Max Carbohydrates" }),
            React.createElement("input", { ref: function ref(input) {
                _this4.maxProtein = input;
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
            React.createElement(
              "button",
              { onClick: function onClick() {
                  _this4.backToSearch();
                } },
              "New Search"
            )
          );
          searchResults = React.createElement(
            "div",
            null,
            React.createElement(
              "h1",
              null,
              "Search results for \"",
              this.state.query,
              "\""
            ),
            React.createElement(
              "ul",
              { className: "search-results" },
              this.state.results.map(function (recipe, index) {
                return React.createElement(
                  "li",
                  { key: index },
                  React.createElement("img", { src: recipe.image }),
                  React.createElement(
                    ReactRouter.Link,
                    { to: "/recipe/" + recipe.id },
                    React.createElement(
                      "p",
                      null,
                      recipe.title
                    )
                  )
                );
              })
            )
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
          searchForm,
          searchResults
        );
      }
    }]);

    return NutrientsSearchComponent;
  }(React.Component);

  FC.NutrientsSearchComponent = NutrientsSearchComponent;
})();
//# sourceMappingURL=NutrientsSearchComponent.js.map
