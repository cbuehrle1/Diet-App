"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var NavBar = function (_React$Component) {
    _inherits(NavBar, _React$Component);

    function NavBar() {
      _classCallCheck(this, NavBar);

      var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this));

      _this.state = { user: {
          displayName: ""
        }, sidebar: "main-landing",
        height: window.innerHeight
      };
      return _this;
    }

    _createClass(NavBar, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var cb = function cb(data) {
          _this2.setState({
            user: data,
            sidebar: _this2.state.sidebar,
            height: window.innerHeight
          });
        };

        $.ajax({
          url: "/api/user"
        }).done(function (data) {
          cb(data);
        });
      }
    }, {
      key: "moveToSideBar",
      value: function moveToSideBar() {
        this.props.callback();
        this.setState({
          user: this.state.user,
          sidebar: "side-bar"
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var navBar;
        var top = this.state.height / 2 - 151;
        var theHeight = this.state.height - 36;

        if (this.state.sidebar === "side-bar") {
          navBar = React.createElement(
            "div",
            { className: this.state.sidebar, style: { height: theHeight } },
            React.createElement(
              "h1",
              null,
              this.state.user.displayName + "'",
              "s Pairings"
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
                "This is an app designed around food pairing. Press Enter to start exploring new custom recipies today!"
              ),
              React.createElement(
                "div",
                { className: "start-button", onClick: function onClick() {
                    _this3.moveToSideBar();
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
