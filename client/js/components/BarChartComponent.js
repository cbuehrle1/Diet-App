if (window.FC === undefined) { window.FC = {}; }

(() => {
  
  function noop () {}

  google.charts.load('visualization', '1', {
    'packages': ['corechart'] })
  google.charts.setOnLoadCallback(noop);

  class BarChartComponent extends React.Component {

    constructor() {
      super();
    }

    componentDidMount() {
      this.state = {
      data: this.dataTable()
      }
      this.draw()
    }

    dataTable() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Element');
      data.addColumn('number', 'Percentage');
      data.addRows([
        ['Nitrogen', 0.78],
        ['Oxygen', 0.21],
        ['Other', 0.01]
      ]);

      return data;
    }

    draw() {

      var data = this.state.data
      console.log(data);
      var element = this.chartDiv;
      var chart = new google.visualization.PieChart(element);
      chart.draw(data, null);

    }

    render() {
      console.log(this.props.percents)
      return <div ref={(div) => {this.chartDiv = div}}></div>
    }
  }

  FC.BarChartComponent = BarChartComponent;

})();
