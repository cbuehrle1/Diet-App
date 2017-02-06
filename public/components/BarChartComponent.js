'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {

  function noop() {}

  google.charts.load('visualization', '1', {
    'packages': ['corechart'] });
  google.charts.setOnLoadCallback(noop);

  var BarChartComponent = function (_React$Component) {
    _inherits(BarChartComponent, _React$Component);

    function BarChartComponent() {
      _classCallCheck(this, BarChartComponent);

      return _possibleConstructorReturn(this, (BarChartComponent.__proto__ || Object.getPrototypeOf(BarChartComponent)).call(this));
    }

    _createClass(BarChartComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.state = {
          data: this.dataTable()
        };
        this.draw();
      }
    }, {
      key: 'dataTable',
      value: function dataTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Element');
        data.addColumn('number', 'Percentage');
        data.addRows([['Nitrogen', 0.78], ['Oxygen', 0.21], ['Other', 0.01]]);

        return data;
      }
    }, {
      key: 'draw',
      value: function draw() {

        var data = this.state.data;
        console.log(data);
        var element = this.chartDiv;
        var chart = new google.visualization.PieChart(element);
        chart.draw(data, null);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        console.log(this.props.percents);
        return React.createElement('div', { ref: function ref(div) {
            _this2.chartDiv = div;
          } });
      }
    }]);

    return BarChartComponent;
  }(React.Component);

  FC.BarChartComponent = BarChartComponent;
})();
//# sourceMappingURL=BarChartComponent.js.map
