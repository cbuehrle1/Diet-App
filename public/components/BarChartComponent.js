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
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {

        if (this.props.percents.length > 0) {

          this.state = {
            data: this.dataTable(),
            options: this.chartOptions()
          };
          this.draw();
        }
      }
    }, {
      key: 'chartOptions',
      value: function chartOptions() {
        var options = {
          title: 'Percent of Diets Daily Value',
          width: 400,
          height: 300,
          bar: { groupWidth: "90%" },
          legend: { position: "none" }
        };

        return options;
      }
    }, {
      key: 'dataTable',
      value: function dataTable() {

        var data = google.visualization.arrayToDataTable([['Nutrient', 'Percent', { role: 'style' }], [this.props.percents[0].title, this.props.percents[0].percent, '#91E0D1'], [this.props.percents[1].title, this.props.percents[1].percent, '#99B6E1'], [this.props.percents[2].title, this.props.percents[2].percent, '#FFC8A5'], [this.props.percents[3].title, this.props.percents[3].percent, '#FFDEA5']]);

        return data;
      }
    }, {
      key: 'draw',
      value: function draw() {

        var data = this.state.data;
        var options = this.state.options;
        var element = this.chartDiv;
        var chart = new google.visualization.BarChart(element);
        chart.draw(data, options);
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
