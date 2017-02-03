"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {

  var localStorageValue = localStorage.getItem("sidebar");

  if (localStorageValue === null) {
    localStorage.setItem("sidebar", "main-landing");
  }

  localStorageValue = localStorage.getItem("sidebar");

  var NavBar = function (_React$Component) {
    _inherits(NavBar, _React$Component);

    function NavBar() {
      _classCallCheck(this, NavBar);

      var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this));

      _this.state = { user: {
          displayName: ""
        }, sidebar: localStorageValue,
        height: window.innerHeight,
        diet: { diets: [] },
        addCat: false,
        catagory: { catagories: [] }
      };

      return _this;
    }

    _createClass(NavBar, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var cb = function cb(user, diet, catagory) {

          if (catagory === undefined) {
            _this2.setState({
              user: user,
              sidebar: _this2.state.sidebar,
              height: window.innerHeight,
              diet: diet,
              addCat: false,
              catagory: _this2.state.catagory
            });
          } else {

            _this2.setState({
              user: user,
              sidebar: _this2.state.sidebar,
              height: window.innerHeight,
              diet: diet,
              addCat: false,
              catagory: catagory
            });
          }
        };

        FC.dietData.registerCallback(cb);

        FC.dietData.loadUser();
      }
    }, {
      key: "moveToSideBar",
      value: function moveToSideBar() {
        localStorage.setItem("sidebar", "side-bar");
        this.props.callback();
        this.setState({
          user: this.state.user,
          sidebar: "side-bar"
        });
      }
    }, {
      key: "createCatagory",
      value: function createCatagory() {

        this.setState({
          user: this.state.user,
          sidebar: this.state.sidebar,
          height: window.innerHeight,
          diet: this.state.diet,
          addCat: true
        });
      }
    }, {
      key: "saveCatagory",
      value: function saveCatagory(evt) {
        var _this3 = this;

        evt.preventDefault();

        var dietIdParam = function dietIdParam() {
          var activeId;

          _this3.state.diet.diets.forEach(function (diet) {

            if (diet.active === true) {
              activeId = diet.id;
            }
          });

          return activeId;
        };

        $.ajax({
          url: "/api/catagory",
          method: "POST",
          data: {
            dietId: dietIdParam(),
            name: this.catagoryName.value
          }
        }).done(function (data) {
          console.log(data);
          FC.dietData.loadUser();
        });
      }
    }, {
      key: "makeActive",
      value: function makeActive(evt) {

        $.ajax({
          url: "/api/makeactive/" + evt.target.id,
          method: "POST",
          data: {}
        }).done(function (data) {
          FC.dietData.loadUser();
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var navBar;
        var top = this.state.height / 2 - 170;
        var theHeight = this.state.height - 36;
        var active;

        if (this.state.sidebar === "side-bar") {

          navBar = React.createElement(
            "div",
            { className: this.state.sidebar, style: { height: theHeight } },
            React.createElement(
              "div",
              { className: "left-nav-container" },
              React.createElement(
                "h1",
                { className: "title-h1" },
                this.state.user.displayName + "'",
                "s Diets"
              ),
              this.state.diet.diets.map(function (diet) {

                var catagories;

                if (diet.active === false) {
                  active = React.createElement(
                    "h2",
                    { id: diet.id, onClick: function onClick(evt) {
                        _this4.makeActive(evt);
                      } },
                    "Activate"
                  );
                } else {
                  active = undefined;

                  if (_this4.state.addCat === false) {
                    catagories = React.createElement(
                      "div",
                      null,
                      React.createElement(
                        "h3",
                        { className: "add-catagory", onClick: function onClick() {
                            _this4.createCatagory();
                          } },
                        "add catagory"
                      ),
                      React.createElement(FC.SavedRecipeComponent, { dietId: diet.id, catagory: _this4.state.catagory.catagories })
                    );
                  } else {
                    catagories = React.createElement(
                      "div",
                      null,
                      React.createElement(
                        "form",
                        { onSubmit: function onSubmit(evt) {
                            _this4.saveCatagory(evt);
                          } },
                        React.createElement("input", { ref: function ref(input) {
                            _this4.catagoryName = input;
                          }, placeholder: "add catagory" })
                      ),
                      React.createElement(FC.SavedRecipeComponent, { dietId: diet.id,
                        catagory: _this4.state.catagory.catagories })
                    );
                  }
                }

                return React.createElement(
                  "div",
                  { key: diet.id },
                  React.createElement(
                    "h1",
                    null,
                    diet.diet
                  ),
                  React.createElement(
                    "h2",
                    null,
                    React.createElement(
                      ReactRouter.Link,
                      { to: "/diet/" + diet.id },
                      "Edit"
                    )
                  ),
                  React.createElement(
                    "h2",
                    { onClick: function onClick() {
                        FC.dietData.deleteDiet(diet.id);
                      } },
                    "Delete"
                  ),
                  active,
                  catagories
                );
              })
            )
          );
        } else {
          navBar = React.createElement(
            "div",
            { className: this.state.sidebar, style: { height: theHeight } },
            React.createElement(
              "div",
              { style: { width: "620px", margin: "0 auto", paddingTop: top } },
              React.createElement(
                "h1",
                null,
                "Welcome ",
                this.state.user.displayName
              ),
              React.createElement(
                "p",
                null,
                "This is an app designed around searching and saving recipes within the context of your diet."
              ),
              React.createElement(
                "p",
                null,
                "Press Enter to start exploring recipies today!"
              ),
              React.createElement(
                "div",
                { className: "start-button", onClick: function onClick() {
                    _this4.moveToSideBar();
                  } },
                "Enter"
              )
            )
          );
        }

        return React.createElement(
          "div",
          null,
          navBar
        );
      }
    }]);

    return NavBar;
  }(React.Component);

  FC.NavBar = NavBar;
})();
//# sourceMappingURL=NavBar.js.map
