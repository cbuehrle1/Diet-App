if (window.FC === undefined) { window.FC = {}; }

(() => {

  class DailyDietComponent extends React.Component {

    constructor() {
      super()
      this.state = { diet: {} };
    }

    componentDidMount() {

      var cb = (noop, diets, noop2) => {

        var active;

        console.log(diets);

        diets.diets.forEach((diet) => {
          if (diet.active) {
            active = diet;
          }
        });

        this.setState({
          diet: active
        })
      }

      FC.dietData.registerCallback(cb);
    }

    componentWillUnmount() {
      console.log(unmounting);
    }

    render() {

      var display;

      if (this.props.show) {
        display = <p>Daily Diet Component</p>
      }

      return <div className="fixed-diet-window">{display}</div>;
    }
  }

  FC.DailyDietComponent = DailyDietComponent;
})()
