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

    componentDidUpdate() {

      if (this.props.percents.length > 0) {

        this.state = {
        data: this.dataTable(),
        options: this.chartOptions()
        }
        this.draw()
      }

    }

    chartOptions() {
      var options = {
        title:'Percent of Diets Daily Value',
        width: 400,
        height: 300,
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
      }

      return options;
    }

    dataTable() {

      var data = google.visualization.arrayToDataTable([
         ['Nutrient', 'Percent', { role: 'style' } ],
         [this.props.percents[0].title, this.props.percents[0].percent, '#91E0D1'],
         [this.props.percents[1].title, this.props.percents[1].percent, '#99B6E1'],
         [this.props.percents[2].title, this.props.percents[2].percent, '#FFC8A5'],
         [this.props.percents[3].title, this.props.percents[3].percent, '#FFDEA5']
      ]);

      return data;
    }

    draw() {

      var data = this.state.data
      var options = this.state.options
      var element = this.chartDiv;
      var chart = new google.visualization.BarChart(element);
      chart.draw(data, options);

    }

    render() {
      console.log(this.props.percents)
      return <div ref={(div) => {this.chartDiv = div}}></div>
    }
  }

  FC.BarChartComponent = BarChartComponent;

})();
